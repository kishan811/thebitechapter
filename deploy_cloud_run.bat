@echo off
title Deploy The Bite Chapter to Google Cloud Run
set "PATH=%LOCALAPPDATA%\Google\Cloud SDK\google-cloud-sdk\bin;%PATH%"
cd /d "d:\Ility\n8n\thebitechapter"

echo ===================================================================
echo   Deploying The Bite Chapter to Google Cloud Run
echo   Target Account: jpsinghal0108@gmail.com
echo ===================================================================
echo.
echo Step 1: Checking authentication...
call gcloud auth login jpsinghal0108@gmail.com

echo.
echo ===================================================================
echo Step 2: Available Google Cloud Projects:
echo ===================================================================
call gcloud projects list

echo.
echo ===================================================================
echo Step 3: Deploying container to Google Cloud Run (asia-south1)...
echo Project: cafe-companion-poc-8492
echo Scale-to-Zero Active: 0 instances when idle ($0 cost)
echo ===================================================================
call gcloud run deploy thebitechapter --source . --project cafe-companion-poc-8492 --region asia-south1 --allow-unauthenticated --min-instances 0 --max-instances 2 --memory 512Mi --cpu 1

if %ERRORLEVEL% NEQ 0 (
    echo.
    echo ===================================================================
    echo   [ERROR] Deployment failed!
    echo   Please check the error message above.
    echo   If it says "BILLING_DISABLED", please enable billing here:
    echo   https://console.developers.google.com/billing/enable?project=cafe-companion-poc-8492
    echo ===================================================================
    pause
    exit /b %ERRORLEVEL%
)

echo.
echo ===================================================================
echo   [SUCCESS] Deployment Complete!
echo   Copy the Service URL above and open it in your browser.
echo ===================================================================
pause
