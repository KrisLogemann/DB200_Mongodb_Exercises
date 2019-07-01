//Insert Documents:

db.movies.insert({ 'title': 'Star Wars', 'writer': 'George Lucas', 'year': 1977, 'actors': [ 
    'Mark Hamill', 
    'Harison Ford', 
    'Carries Fisher', 
    'Peter Chushing', 
    'James Earl Jones' ] })

db.movies.insert({ 'title': 'Raiders of the Lost Ark', 'writer': 'George Lucas', 'year': 1981, 'actors': [ 'Harrison Ford' ] })

db.movies.insert({ 'title': 'Fight Club', 'writer': 'Chuck Palahniuk', 'year': 1999, 'actors': [ 'Brad Pitt', 'Edward Norton' ] })

db.movies.insert({ 'title': 'Pulp Fiction', 'writer': 'Quentin Tarantino', 'year': 1994, 'actors': [ 'John Travolta', 'Uma Thurman' ] })

db.movies.insert({ 'title': 'Inglorious Basterds', 'writer': 'Quentin Tarantino', 'year': 2009, 'actors': [ 'Brad Pitt', 'Diane Kruger', 'Eli Roth' ] })

db.movies.insert({ 'title': 'The Hobbit: An Unexpected Journey', 'writer': 'J.R.R. Tolkein', 'year': 2012, 'franchise': 'The Hobbit' })

db.movies.insert({ 'title': 'The Hobbit: The Desolation of Smaug', 'writer': 'J.R.R. Tolkein', 'year': 2013, 'franchise': 'The Hobbit' })

db.movies.insert({ 'title': 'Pee Wee Hermans Big Adventure', 'writer': 'Phil Hartman', 'year': 1985 })

db.movies.insert({ 'title': 'Avatar' })

//Query / Find Documents:

db.movies.find({})

db.movies.find({ 'writer': 'Quentin Tarantino' })

db.movies.find({ 'actors': 'Brad Pitt' })

db.movies.find({ 'franchise': 'The Hobbit' })

db.movies.find({ 'year':{ $gte: 1990, $lt: 2000} })

db.movies.find({ 'year':{$not:{$lt: 2000, $gt: 2010 }} })

//Update Documents:

db.movies.update({ 'title': 'The Hobbit: An Unexpected Journey'}, {$set: {'synopsis': 'A reluctant hobbit, Bilbo Baggins, sets out to the Lonely Mountain with a spirited group of dwarves to reclaim their mountain home - and the gold within it - from the dragon Smaug' } })

db.movies.update({'title': 'The Hobbit: The Desolation of Smaug'},{$set: {'synopsis': 'The dwarves, along with Bilbo Baggins and Gandalf the Grey, continue their quest to reclaim Erebor, their homeland, from Smaug. Bilbo Baggins is in possession of a mysterious and magical ring.'}})

db.movies.update({ 'title': 'Pulp Fiction'},{$set:{ 'actors': 'Samuel L. Jackson'} })

//Text Search:

db.movies.find({synopsis: /Bilbo/})

db.movies.find({synopsis: /Gandalf/})

db.movies.find({ $and: [{synopsis: {$regex: 'Bilbo'}}, {synopsis: {$not: {$regex: 'Gandalf'}}}]})

db.movies.find({ $or: [{ synopsis: { $regex: 'dwarves'} },{synopsis: { $regex: 'hobbit'}}]})

db.movies.find({ $and: [{ synopsis: {$regex: 'gold'}}, {synopsis: {$regex: 'dragon'}}]})

db.movies.deleteOne({ 'title': 'Pee Wee Hermans Big Adventure' })

db.movies.deleteOne({ 'title': 'Avatar' })

//Relationships:

db.users.insert({ 'username': 'SallySmith', 'first_name': 'Sally', 'last_name': 'Smith' })

db.users.insert({ 'username': 'JimmyHagen', 'full_name':{'first': 'Jimmy', 'last': 'Hagen'} })

db.posts.insert({ 'username': 'SallySmith', 'title': 'Passes out at party', 'body': 'Wakes up early and cleans house' })

db.posts.insertMany([{'username': 'SallySmith', 'title': 'Buys a House', 'body': 'Living in a new neighborhood now'},
{'username': 'SallySmith', 'title': 'Reports a bug in your code', 'body': 'Sends you a Pull Request'},
{'username': 'JimmyHagen', 'title': 'Borrows something', 'body': 'Returns it when he is done'},
{'username': 'JimmyHagen', 'title': 'Borrows everything', 'body': 'The end'},
{ 'username': 'JimmyHagen', 'title': 'Forks your repo on github', 'body': 'Sets to private'} ])

db.comments.insertMany([{"username":"SallySmith","comment":"Hope you got a good deal!","post": [ObjectId("5d07c1463cb939f36c416ac8")]},
{"username":"SallySmith", "comment":"What's mine is yours!", "post": [ObjectId("5d07c1463cb939f36c416ac9")]},
{"username":"SallySmith","comment":"Don't violate the licensing agreement!","post": [ObjectId("5d07c1463cb939f36c416aca")]},
{"username":"JimmyHagen", "comment":"It still isn't clean", "post": [ObjectId("5d07c1463cb939f36c416ac5")]},
{"username":"JimmyHagen", "comment":"Denied your PR cause I found a hack", "post": [ObjectId("5d07c1463cb939f36c416ac7")]}])

//Querying Related Collections:

db.users.find({})

db.posts.find({})

db.posts.find({ 'username': 'SallySmith' })

db.posts.find({ 'username': 'JimmyHagen' })

db.comments.find({})

db.comments.find({ 'username': 'SallySmith' })

db.comments.find({ 'username': 'JimmyHagen' })

db.posts.aggregate([{ $match: {"title":"Reports a bug in your code"}},
{$lookup: {from: "comments", localField: "_id", foreignField: "post", as: "all_comments"}},
{$project: {all_comments:1,_id:0}}])