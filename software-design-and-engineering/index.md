# Software Design and Engineering

## Travlr Getaways

Travlr Getaways is a full-stack web application I originally developed in CS 465: Full Stack Development I. The application uses the MEAN stack with MongoDB, Express, Angular, and Node.js and includes a customer-facing travel site, an administrative interface, REST API functionality, trip management, and user authentication.

### Original Artifact

The original version represents the application as it was completed in CS 465 before the capstone enhancement.

[Download the Original Artifact](original/CS499_Travlr_Original_Artifact.zip)

### Initial Enhancement

For the Software Design and Engineering category of CS 499, I enhanced Travlr Getaways by implementing role-based access control using Admin and Editor roles.

The enhancement includes:

- User roles stored in the application data model
- Role information included in JSON Web Tokens
- Server-side authorization middleware
- Admin permission to add, edit, and delete trips
- Editor permission to add and edit trips without delete access
- Angular interface controls that reflect user permissions
- Focused verification testing for authorized and unauthorized operations

The enhanced application retains the original authentication system while adding authorization and least-privilege controls.

[Download the Enhanced Artifact](enhanced/CS499_Travlr_Enhanced_Artifact.zip)

[View RBAC Verification Results](enhanced/source/RBAC_Test_Results.txt)

### Current Status

This is the initial enhancement completed for Milestone Two of CS 499. The artifact will be reviewed and revised as needed based on instructor feedback before the final ePortfolio is completed.
