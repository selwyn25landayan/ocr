# Development of a Mobile Application for Individualized Expense Tracking

## Technological Institute of the Philippines - Computer Engineering Department, Quezon City

### In partial fulfillment of the requirements in CPE 026 – Emerging Technology 3 (Mobile Computing)

---

### Team Members:
- Landayan, Selwyn Charlz Angelo Z.
- Marbebe, Jerome M.
- Martinez, Paul Andrei A.
- Tayam, John Irylle Chester L.
- Tubalinal, Kian Jacob Anthony C.


### Supervisor:
- Engr. Roman M. Richard

---

## Problem Background and Validation

### The Problem:
Money is an integral part of everyone's life. A person unable to manage his expenses cannot successfully lead a household and achieve his objectives. In today's world, where mobile phones and laptop computers have become commonplace, such an app would help keep track of all our expenses. A person cannot generally keep track of all his costs using the traditional pen-and-paper method and may miss a few small expenditures and some bills.

---

## Project Description

### General Objective:
To develop a mobile application for individualized expense tracking to help people track their expenses.

### Specific Objectives:
- Develop an application that scans a receipt and extracts the text into JSON format.
- Calculates the total expenses from the JSON file of costs recorded. 
- Displays a dashboard containing analytics on user expenses based on weekly and monthly aggregation.
- Test and evaluate the application’s accuracy.


---

## Getting Started

The following instructions will get a local copy of the project up and running for development and testing purposes.

### Prerequisites

Before you start, make sure the following applications have been downloaded:
- Git
- Node.js and npm
- Expo CLI

### Installation

1. Clone the repository
   git clone https://github.com/selwyn25landayan/ocr.git

2. Navigate to the project directory:
   cd ocr 

3. Add a .env file:
   Create a .env file in the project root and include your Google Maps API key.

4. Install dependencies:
   npm install

5. Start the application:
   npx expo start
