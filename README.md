# EasyFund - Fundraising Analytics Platform 

A comprehensive platform for scraping, analyzing, and visualizing Crunchbase data using machine learning to generate insights through an interactive dashboard.

## Project Overview

This project automates the collection and analysis of Crunchbase data through the following pipeline:
1. Web scraping Crunchbase pages
2. Data collection and storage
3. Data cleaning and organization
4. Analysis using ML models
5. Insight generation
6. Visualization through a dashboard interface

## Project Structure


_MACOSX/
├── proj/
    ├── public/
    │   ├── favicon.ico
    │   ├── index.html
    │   ├── logo192.png
    │   ├── logo512.png
    │   ├── manifest.json
    │   └── robots.txt
    ├── src/
    │   ├── api/
    │   ├── components/
    │   ├── lib/
    │   ├── pages/
    │   ├── server/
    │   ├── styles/
    │   ├── App.css
    │   ├── App.js
    │   ├── App.test.js
    │   ├── index.css
    │   ├── index.js
    │   ├── logo.svg
    │   ├── reportWebVit.js
    │   └── setupTests.js
    ├── .env
    ├── .gitignore
    ├── package-lock.json
    ├── package.json
    └── server.js


## Features

- *Web Scraping Module*: Automated collection of data from Crunchbase pages
- *Data Processing Pipeline*: Clean and organize raw data for analysis
- *Machine Learning Model*: Generate insights and patterns from processed data
- *Interactive Dashboard*: Visualize analysis results and insights
- *Backend API*: Handle data processing and serve dashboard content

## Project Workflow

### 1. Data Collection Pipeline
mermaid
graph LR
    A[Web Scraper] --> B[Crunchbase Pages]
    B --> C[Raw Data Collection]
    C --> D[Data Storage]
    D --> E[Data Cleaning]


### 2. Analysis Workflow
mermaid
graph TD
    A[Clean Data] --> B[Feature Engineering]
    B --> C[ML Model Training]
    C --> D[Generate Insights]
    D --> E[Dashboard Updates]


### 3. Development Workflow
1. *Feature Development*
   - Create feature branch from develop
   - Implement feature/fix
   - Write tests
   - Submit PR to develop

2. *Code Review Process*
   - Code review by at least one team member
   - Run automated tests
   - Review test coverage
   - Approve and merge

3. *Deployment Pipeline*
   
   develop → staging → main
   
   - Automated tests on staging
   - Manual QA on staging
   - Production deployment from main

4. *Release Cycle*
   - Weekly releases to staging
   - Bi-weekly production releases
   - Hotfixes as needed

### 4. Data Update Workflow
- Daily automated scraping
- Hourly data processing
- Real-time dashboard updates
- Weekly ML model retraining

### 5. Monitoring and Maintenance
- System health monitoring
- Data quality checks
- Performance metrics tracking
- Error logging and alerting

## Getting Started

1. *Prerequisites*
   - Node.js (v14 or higher)
   - npm or yarn
   - Required environment variables (see .env.example)

2. *Installation*
   bash
   

   # Install dependencies
   npm install

   # Set up environment variables
   cp .env.example .env
   

3. *Running the Application*
   bash
   # Start the backend server
   npm run server

   # Start the frontend development server
   npm run start
   

## Configuration

Create a .env file in the root directory with the following variables:

DB_CONNECTION_STRING=
API_KEY=
PORT=


## Development

- Frontend: React.js application with component-based architecture
- Backend: Node.js server handling data processing and API endpoints
- Data Storage: [Specify your database choice]
- Machine Learning: [Specify ML framework/tools used]

## Testing

bash
npm run test


## Building for Production

bash
npm run build

## Database
![WhatsApp Image 2025-01-29 at 20 10 57_8bdfca7c](https://github.com/user-attachments/assets/6f1b8744-1e77-41c2-8bb9-3e0c87346209)



## Predictive Analytics for Startups
Created a machine learning model to project the success rate of startups based on several parameters
![WhatsApp Image 2025-01-29 at 20 50 46_43f1df4a](https://github.com/user-attachments/assets/b2f5ed32-17f5-4d70-a2ba-b139d5907cd1)




## Contributing

1. Fork the repository
2. Create your feature branch (git checkout -b feature/AmazingFeature)
3. Commit your changes (git commit -m 'Add some AmazingFeature')
4. Push to the branch (git push origin feature/AmazingFeature)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
