Updated: 01.2026  
Script created by Salvador Camacho

This script was created with best practices, so it is more resilient, such as:
* Mainly AI, but property-based steps when needed
* Data Driving, parametrization of credentials, URL, search term and Browser
* Some main validations
* Measure of transactions
* Logic for waiting for deletion

This script logs in to Documentum D2 Classic, uploads 8 files, measures in a transaction how log that takes, deletes all files uploaded and logs out

This script has 3 transactions:  
Documentum D2-Classic-S03-01 Sign In  
Documentum D2-Classic-S03-02 Upload Multiple Documents  
Documentum D2-Classic-S03-03 All Files Deletion  
Documentum D2-Classic-S03-04 Logout