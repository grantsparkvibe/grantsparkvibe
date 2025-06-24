#!/usr/bin/env python3
"""
Database setup script for GrantSparkVibe
"""

import os
from pymongo import MongoClient
from dotenv import load_dotenv

def setup_database():
    load_dotenv()
    
    # Connect to MongoDB
    client = MongoClient(os.getenv('MONGODB_URI'))
    db = client['grantsparkvibe']
    
    # Create collections with indexes
    collections = {
        'users': [
            ('email', 1),
            ('type', 1),
            ('region', 1)
        ],
        'grants': [
            ('title', 'text'),
            ('description', 'text'),
            ('funder', 1),
            ('deadline', 1),
            ('region', 1),
            ('category', 1)
        ],
        'applications': [
            ('userId', 1),
            ('grantId', 1),
            ('status', 1),
            ('deadline', 1)
        ]
    }
    
    for collection_name, indexes in collections.items():
        collection = db[collection_name]
        for index in indexes:
            if isinstance(index, tuple):
                collection.create_index([index])
            else:
                collection.create_index(index)
        print(f"✅ Created collection: {collection_name}")
    
    print("🎉 Database setup complete!")

if __name__ == "__main__":
    setup_database()
