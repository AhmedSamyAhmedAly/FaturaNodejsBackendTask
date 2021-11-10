# ## # Fatura Backend Task

##### **project features
- user authentication
- user authorization**

/////////////////////////////////////////////////////////////////////////////

**framework    ===> express ///
database      ===> mongodb  ///
datastore      ===>redis cloud  ///
APIs test       ===> Postman**  /// 

/////////////////////////////////////////////////////////////////////////////


## development steps :
1- setup the environment (express , mongo , redis )

2- setup the database connection and redis 

3- build the database model 

4- adding security layer with random string in API URL 
With API KEY =>  "facd3f50-befb-4dda-a77a-13fbd02d2f24"
eg. =>http://localhost:3000/api/users?api_key=facd3f50-befb-4dda-a77a-13fbd02d2f24

5- adding middlewares ===>
- logger middleware to log actions and time 
- error handling 
- authentication using JWT and session 
- authorization using roles
- validation the request body using express validator

6-creating the route helpers

7-create the routes

8- test using postman 

/////////////////////////////////////////////////////////////////////////////

## routes :
**register//
login/logout//
get logged users/get all users  / get user by id//
update user profile / update user by id//
delete user profile / delete user by id**//
/////////////////////////////////////////////////////////////////////////////
## #### **notes:
### the code is commented
### file attached with postman collection **

# thanks
