# Example Python Code to Insert a Document

from pymongo import MongoClient
from pymongo.errors import PyMongoError
from bson.objectid import ObjectId


class AnimalShelter(object):
    """ CRUD operations for Animal collection in MongoDB """

    def __init__(self, username, password):
        # Initializing the MongoClient. This helps to access the MongoDB
        # databases and collections. This is hard-wired to use the aac
        # database, the animals collection, and the aac user.
        #
        # You must edit the password below for your environment.
        #
        # Connection Variables
        #
        USER = username
        PASS = password
        HOST = 'localhost'
        PORT = 27017
        DB = 'aac'
        COL = 'animals'
        #
        # Initialize Connection
        #
        self.client = MongoClient(
            'mongodb://%s:%s@%s:%d' % (USER, PASS, HOST, PORT)
        )
        self.database = self.client['%s' % (DB)]
        self.collection = self.database['%s' % (COL)]

    # Create a method to return the next available record number for use in the create method

    # Complete this create method to implement the C in CRUD.
    def create(self, data):
        if data is not None:
            try:
                result = self.collection.insert_one(data)
                return result.acknowledged
            except PyMongoError:
                return False
        else:
            raise Exception("Nothing to save, because data parameter is empty")

    # Create method to implement the R in CRUD.
    def read(self, query):
        try:
            cursor = self.collection.find(query)
            return list(cursor)
        except PyMongoError:
            return []

    # Create method to implement the U in CRUD.
    def update(self, query, new_values):
        if query is not None and new_values is not None:
            try:
                result = self.collection.update_many(
                    query,
                    {"$set": new_values}
                )
                return result.modified_count
            except PyMongoError:
                return 0
        else:
            raise Exception("Query or update parameter is empty")

    # Create method to implement the D in CRUD.
    def delete(self, query):
        if query is not None:
            try:
                result = self.collection.delete_many(query)
                return result.deleted_count
            except PyMongoError:
                return 0
        else:
            raise Exception("Query parameter is empty")

    # Execute a MongoDB aggregation pipeline and return the results.
    def aggregate(self, pipeline):
        if pipeline is not None:
            try:
                cursor = self.collection.aggregate(pipeline)
                return list(cursor)
            except PyMongoError:
                return []
        else:
            raise Exception("Pipeline parameter is empty")