# SignIn and SignUp page
## User 
Simple signup and signin
## Pharmacy
Upload doc
Wait for verify
then signup and sign in
## Admin
Normal signup and sign in

# Home Page
Image
All features
Shop by health concern https://www.1mg.com/?utm_source=chatgpt.com
Names of pharmacy we have

# User Page - Dashboard
Medicines he is taking
Pharmacy he is using
Number of Days he is taking the medicine
Days remaining for the dose
Next check up
Continue the dose
Reminder setter

# Pharmacy Page - Dashboard
Medicine they are having
Number of medicines they have
Upcoming medicines stock
Expiry shower

# Admin Page
Request for approval
yes -> update the flag
Who they have approved and rejected

```mermaid
flowchart LR

%% AUTH
A[Signup / Signin] --> B{Role?}

%% USER
B -->|User| C[User Dashboard]
C --> C1[Browse Medicines]
C --> C2[Place Orders]
C --> C3[Manage Profile]

%% PHARMACY
B -->|Pharmacy| D[Pharmacy Dashboard]
D --> D1[Upload Docs at Signup]
D --> D2{isVerified?}
D2 -->|No| D3[Blocked: Awaiting Verification]
D2 -->|Yes| D4[Manage Products]

%% ADMIN
B -->|Admin| E[Admin Dashboard]
E --> E1[Verify Pharmacies]
E --> E2[Manage Users]
E --> E3[System Controls]
E --> E4[Reports/Analytics]


```