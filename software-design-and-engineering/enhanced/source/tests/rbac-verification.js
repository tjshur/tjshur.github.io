const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

const User = require('../app_api/models/user');
const Trip = require('../app_api/models/travlr');

const API_BASE = 'http://localhost:3000/api';
const DB_HOST = process.env.DB_HOST || '127.0.0.1';
const DB_URI = `mongodb://${DB_HOST}/travlr`;

const testId = Date.now();

const editorEmail = `rbac.editor.${testId}@test.com`;
const adminEmail = `rbac.admin.${testId}@test.com`;

const editorTripCode = `ED${String(testId).slice(-8)}`;
const adminTripCode = `AD${String(testId).slice(-8)}`;

const password = 'Test123!';

let failures = 0;

function pass(testName, detail = '') {
    console.log(`PASS: ${testName}${detail ? ` - ${detail}` : ''}`);
}

function fail(testName, detail = '') {
    failures++;
    console.log(`FAIL: ${testName}${detail ? ` - ${detail}` : ''}`);
}

function checkStatus(testName, actual, expected) {
    if (actual === expected) {
        pass(testName, `HTTP ${actual}`);
        return true;
    }

    fail(testName, `Expected HTTP ${expected}, received HTTP ${actual}`);
    return false;
}

async function apiRequest(path, method = 'GET', body = null, token = '') {
    const headers = {};

    if (body !== null) {
        headers['Content-Type'] = 'application/json';
    }

    if (token) {
        headers.Authorization = `Bearer ${token}`;
    }

    const response = await fetch(`${API_BASE}${path}`, {
        method,
        headers,
        body: body !== null ? JSON.stringify(body) : undefined
    });

    const text = await response.text();

    let responseBody = null;

    if (text) {
        try {
            responseBody = JSON.parse(text);
        } catch {
            responseBody = text;
        }
    }

    return {
        status: response.status,
        body: responseBody
    };
}

async function registerUser(name, email) {
    return apiRequest(
        '/register',
        'POST',
        {
            name,
            email,
            password
        }
    );
}

async function loginUser(email) {
    return apiRequest(
        '/login',
        'POST',
        {
            email,
            password
        }
    );
}

async function runVerification() {
    console.log('');
    console.log('============================================');
    console.log('Travlr Getaways RBAC Verification');
    console.log('============================================');
    console.log('');

    try {
        await mongoose.connect(DB_URI);

        console.log(`Connected to ${DB_URI}`);
        console.log('');

        const baseTrip = {
            code: editorTripCode,
            name: 'RBAC Editor Test Trip',
            length: '3 nights / 4 days',
            start: '2026-10-15',
            resort: 'RBAC Test Resort',
            perPerson: '999',
            image: 'reef1.jpg',
            description: 'Temporary trip created by the automated RBAC verification script.'
        };

        // ------------------------------------------------------------
        // Test 1: Unauthenticated users cannot create trips
        // ------------------------------------------------------------

        const unauthenticatedCreate = await apiRequest(
            '/trips',
            'POST',
            baseTrip
        );

        checkStatus(
            'Unauthenticated trip creation is blocked',
            unauthenticatedCreate.status,
            401
        );

        // ------------------------------------------------------------
        // Create Editor account
        // ------------------------------------------------------------

        const editorRegistration = await registerUser(
            'RBAC Test Editor',
            editorEmail
        );

        if (!checkStatus(
            'Editor registration succeeds',
            editorRegistration.status,
            200
        )) {
            throw new Error('Unable to continue without Editor account.');
        }

        const editorToken = editorRegistration.body.token;
        const editorPayload = jwt.decode(editorToken);

        if (editorPayload && editorPayload.role === 'editor') {
            pass(
                'New users receive Editor role',
                `JWT role = ${editorPayload.role}`
            );
        } else {
            fail(
                'New users receive Editor role',
                `JWT role = ${editorPayload?.role}`
            );
        }

        // ------------------------------------------------------------
        // Create Admin account
        // ------------------------------------------------------------

        const adminRegistration = await registerUser(
            'RBAC Test Admin',
            adminEmail
        );

        if (!checkStatus(
            'Admin test account registration succeeds',
            adminRegistration.status,
            200
        )) {
            throw new Error('Unable to continue without Admin test account.');
        }

        const promotionResult = await User.updateOne(
            { email: adminEmail },
            { $set: { role: 'admin' } }
        );

        if (
            promotionResult.matchedCount === 1 &&
            promotionResult.modifiedCount === 1
        ) {
            pass('Admin test account promoted in database');
        } else {
            fail(
                'Admin test account promoted in database',
                `matched=${promotionResult.matchedCount}, modified=${promotionResult.modifiedCount}`
            );
        }

        // Log in again so the new JWT contains the Admin role.
        const adminLogin = await loginUser(adminEmail);

        if (!checkStatus(
            'Admin login succeeds after role assignment',
            adminLogin.status,
            200
        )) {
            throw new Error('Unable to continue without Admin token.');
        }

        const adminToken = adminLogin.body.token;
        const adminPayload = jwt.decode(adminToken);

        if (adminPayload && adminPayload.role === 'admin') {
            pass(
                'Admin JWT contains Admin role',
                `JWT role = ${adminPayload.role}`
            );
        } else {
            fail(
                'Admin JWT contains Admin role',
                `JWT role = ${adminPayload?.role}`
            );
        }

        // ------------------------------------------------------------
        // Editor permission tests
        // ------------------------------------------------------------

        const editorCreate = await apiRequest(
            '/trips',
            'POST',
            baseTrip,
            editorToken
        );

        if (!checkStatus(
            'Editor can create a trip',
            editorCreate.status,
            201
        )) {
            throw new Error('Editor trip could not be created.');
        }

        const updatedEditorTrip = {
            ...baseTrip,
            name: 'RBAC Editor Test Trip - Updated',
            perPerson: '1099',
            description: 'Temporary trip updated by an Editor during RBAC verification.'
        };

        const editorUpdate = await apiRequest(
            `/trips/${editorTripCode}`,
            'PUT',
            updatedEditorTrip,
            editorToken
        );

        checkStatus(
            'Editor can edit a trip',
            editorUpdate.status,
            200
        );

        const editorDelete = await apiRequest(
            `/trips/${editorTripCode}`,
            'DELETE',
            null,
            editorToken
        );

        checkStatus(
            'Editor cannot delete a trip',
            editorDelete.status,
            403
        );

        // ------------------------------------------------------------
        // Admin permission tests
        // ------------------------------------------------------------

        const adminTrip = {
            code: adminTripCode,
            name: 'RBAC Admin Test Trip',
            length: '4 nights / 5 days',
            start: '2026-11-01',
            resort: 'Admin Test Resort',
            perPerson: '1200',
            image: 'reef2.jpg',
            description: 'Temporary trip created by an Admin during RBAC verification.'
        };

        const adminCreate = await apiRequest(
            '/trips',
            'POST',
            adminTrip,
            adminToken
        );

        checkStatus(
            'Admin can create a trip',
            adminCreate.status,
            201
        );

        const updatedAdminTrip = {
            ...adminTrip,
            name: 'RBAC Admin Test Trip - Updated',
            perPerson: '1250'
        };

        const adminUpdate = await apiRequest(
            `/trips/${adminTripCode}`,
            'PUT',
            updatedAdminTrip,
            adminToken
        );

        checkStatus(
            'Admin can edit a trip',
            adminUpdate.status,
            200
        );

        const adminDeleteOwnTrip = await apiRequest(
            `/trips/${adminTripCode}`,
            'DELETE',
            null,
            adminToken
        );

        checkStatus(
            'Admin can delete a trip',
            adminDeleteOwnTrip.status,
            200
        );

        // Admin also removes the Editor-created trip after the Editor
        // was denied permission to delete it.
        const adminDeleteEditorTrip = await apiRequest(
            `/trips/${editorTripCode}`,
            'DELETE',
            null,
            adminToken
        );

        checkStatus(
            'Admin can delete a trip that an Editor could not delete',
            adminDeleteEditorTrip.status,
            200
        );

        console.log('');
        console.log('============================================');

        if (failures === 0) {
            console.log('RBAC VERIFICATION RESULT: ALL TESTS PASSED');
        } else {
            console.log(
                `RBAC VERIFICATION RESULT: ${failures} TEST(S) FAILED`
            );
        }

        console.log('============================================');
        console.log('');
    } catch (error) {
        failures++;

        console.error('');
        console.error('RBAC verification could not complete.');
        console.error(error);
        console.error('');
    } finally {
        try {
            // Clean up anything created by this verification run.
            await Trip.deleteMany({
                code: {
                    $in: [editorTripCode, adminTripCode]
                }
            });

            await User.deleteMany({
                email: {
                    $in: [editorEmail, adminEmail]
                }
            });

            console.log('Temporary RBAC test data cleaned up.');
        } catch (cleanupError) {
            console.error('Warning: test cleanup encountered an error.');
            console.error(cleanupError);
        }

        if (mongoose.connection.readyState !== 0) {
            await mongoose.disconnect();
        }

        process.exitCode = failures === 0 ? 0 : 1;
    }
}

runVerification();