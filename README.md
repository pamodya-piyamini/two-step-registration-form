# Two Step Registration Form

## Project Description
A simple two step registration form which allow users to add their personal details and password for the registration procedure.
The form splits the registration process into two steps to improve usability.

## Setup Instructions
1. Clone
git clone https://github.com/pamodya-piyamini/two-step-registration-form


2. Frontend setup
cd two-step-registration-form
npm install


3. Backend setup
cd two-step-registration-form/backend
npm install

4. Setup environment 
assigned an unused port to 'REACT_APP_API_BASE_URL'
ex: REACT_APP_API_BASE_URL=http://localhost:8000/api

5. Start the application
frontend - 
cd two-step-registration-form
npm start

backend -
cd two-step-registration-form/backend
npm start

8. Access the application
Open your browser and go to: 
[REACT_APP_API_BASE_URL]
Ex: http://localhost:8000/api


## Assumptions & Decisions 
- The phone number is not required
- User need to complete step one before moving into step two
- User cannot skip required fields
- Advanced validation is not required for this process.
- Sensitive data is not involved 
- Database is not required 