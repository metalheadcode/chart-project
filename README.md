# Understand Stock Charting

## Introduction

This project is designed to facilitate learning the utilization of react-stockcharting, with a dual focus on comprehending the management of substantial datasets from stock timeseries and gaining proficiency in [D3.js](https://d3js.org) simultaneously. Demo [here](https://chart-project-cyan.vercel.app).

### How to run this project?

Steps to run this project:

1. Install all packages: `npm install --legacy-peer-deps`

2. Create a new .env file:

    ![Create .env File](./public/readme_images/create_env.png)

3. Add **REACT_APP_API_URL** and **REACT_APP_API_KEY**. For the API Key, you can register at [FMP](https://site.financialmodelingprep.com/). Here are the detailed steps you can follow:

    * Click register:

        ![Register](./public/readme_images/register.png)

    * After registering, you will be redirected to the homepage. Click on the dashboard:

        ![Dashboard](./public/readme_images/click_dashboard.png)

    * You will get your own API Keys. Copy them and paste them in the .env file, naming them as REACT_APP_API_KEY:

        ![Dashboard](./public/readme_images/dashboard.png)

### How To Use?

1. Type a NASDAQ Symbol:

    ![Type a NASDAQ Symbol](./public/readme_images/type_symbol.png)

2. Wait until the chart is fully displayed:

    ![Chart Displayed](./public/readme_images/finally.png)

3. You can toggle the indicator on or off here:

    ![Toggle Indicator](./public/readme_images/close_indicator.png)
