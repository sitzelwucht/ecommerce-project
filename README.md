# eCommerce Project


## General Info

Fullstack (MERN) ecommerce project that allows a user to sign up as either admin or end user, and respectively either add to or modify the inventory, or browse it, add products to favorites and cart. As end user, you will be able to check out using Stripe in test environment.

## Project status

In progress.

## Technologies

Frontend: 
  * react 
  * bootstrap

Backend: 
  * nodeJS
  * express
  * mongoDB
 
## Routes

**Frontend (react router):**
  
  * /
      * redirects to front page if not logged in; if logged in and admin, redirects to admin  panel; if end user, redirects to user home page
  
  * /home
    
    * redirects to admin/user home page accordingly, to / if not logged in

  * /adminhome

    * renders admin panel if user is admin, else a prompt to log in as admin

  * /bycategory/:category

    * renders page with products from chosen category

  * /product/:id

    * renders a product based on id

  * /categories

    * renders page with all categories

  * /checkout

    * renders checkout page

  
**Backend:**

 **auth**

  * GET

    * /user

      * confirms logged in user

    * /getuser/:id

      * fetches logged in user's data

  * POST

    *  /signup
      
       * redirects to / if user is logged in

    *  /login

       * redirects to / if user is logged in

    *  /admin-login
     
       * redirects to / if user is logged in

    *  /logout

       * ends session

  * PATCH

     * /edituser/:id


 **product**
  * GET

    *  /categories

       * renders all current categories

    *  /bycategory/:category

       * renders all products from given category 

    *  /productsearch

       * renders products the titles of which include inputted search string

    *  /getproduct/:prodId

       * get product by product id

    *  /allproducts

       * get all products from all categories

  * POST

    *  /newproduct

    *  /newcategory

  * DELETE

    *  /products/:prodId
 
  * PATCH

    *  /products/:prodId
     

**payment**

  * POST
 
    * /payment


## Dependencies

Aside from the usual dependecies for MERN, for payments the project uses
- @stripe/react-stripe-js (1.4.0)
- @stripe/stripe-js (1.14.0)
- react-stripe-checkout (2.6.3)
- stripe  (8.148.0)
- uuid  (8.3.2)


## Backlog

- Use Redux for state management instead of contexts
