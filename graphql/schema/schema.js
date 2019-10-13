const {buildSchema} = require('graphql');

module.exports = buildSchema(`
        type blog {
            _id:        ID!
            title:      String!
            content:    String!
            image:      String!
            date:       String!
            category:   Category!
            creator:    user!
        }

        type Category {
            _id:        ID!
            catName:    String!
            blogs:      blog!
        }

        type user {
            _id:        ID!
            email:      String!
            password:   String
            profile:    Prof!
            blogs:      blog!
        }

        type Prof {
            nickname:   String!
            firstname:  String!
            lastname:   String!
        }

        type AuthData {
            userId:     ID!
            token:      String!
            tokenEx:    Int!
            profile:    Prof!
        }

        type about {
            _id:        String!
            title:      String!
            content:    String!
        }

        type service {
            _id:        ID!
            title:      String!
            image:      String!
        }

        type subscribe {
            _id:        ID!
            name:       String!
            email:      String!
            subject:    String!
            text:       String!
        }

        type contact {
            _id:        ID!
            mAddrs:     String!
            email:      String!
            mobile:     Float!
            bAddrs:     String!
        }

        input  InputBlog {
            title:      String!
            content:    String!
            image:      String!
            date:       String!
            category:   ID!
            creator:    ID!
        }

        input InputCategory {
            catName:    String!
        }

        input Profile {
            nickname:   String!
            firstname:  String!
            lastname:   String!
        }

        input InputUser {
            email:      String!
            password:   String!
            profile:    Profile!
        }

        input InputAbout {
            title:      String!
            content:    String!
        }

        input InputService {
            title:      String!
            image:      String!
        }

        input InputSubs {
            name:       String!
            email:      String!
            subject:    String!
            text:       String!
        }

        input InputContact {
            mAddrs:     String!
            email:      String!
            mobile:     Float!
            bAddrs:     String!
        }

        type rootQuery {
            blogs:      [blog!]!
            categories: [Category!]!
            users:      [user!]!
            about:      [about!]!
            service:    [service!]!
            subscribe:  [subscribe!]!
            contact:    [contact!]!
            login(email: String!, password: String) : AuthData!
            singleBlog(_id: String) : blog!
        }

        type rootValue {
            addBlog(inputBlog: InputBlog):  blog
            addCategory(inputCategory: InputCategory ): Category
            addUser(inputUser: InputUser): user
            addAbout(inputAbout: InputAbout): about
            addService(inputService: InputService): service
            addSubs(inputSubs: InputSubs): subscribe
            addContact(inputContact:InputContact ): contact
        }

        schema {
            query:      rootQuery
            mutation:   rootValue
        }
    `);