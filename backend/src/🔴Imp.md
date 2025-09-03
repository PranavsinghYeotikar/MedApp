# Add Prescription
if you want to add prescription 
then get the user token by hitting this `http://localhost:5000/auth/signin` by using any user's email and password
put that token as header in this `http://localhost:5000/prescriptions` in post, then in header `Authorization : Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY4YjZkNTljYzg3NzI4ZWM3NDMwN2VjYyIsInJvbGUiOiJ1c2VyIiwiaWF0IjoxNzU2OTAxODI0LCJleHAiOjE3NTY5MDU0MjR9.HdjV58G5cIbhax7D7b9RTMXuuHqkiEm6vdm8EDz06jo`
add prescription 
```json
{
  "medicineName": "Paracetamol",
  "dosage": "500mg",
  "frequency": "2 times a day",
  "startDate": "2025-09-03",
  "endDate": "2025-09-07"
}
```
hit