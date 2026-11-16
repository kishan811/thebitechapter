@echo off
title Push The Bite Chapter to GitHub (kishan811)
cd /d "d:\Ility\n8n\thebitechapter"

echo ===================================================================
echo   Pushing The Bite Chapter to GitHub
echo   Account: kishan811
echo   Repository: https://github.com/kishan811/thebitechapter
echo ===================================================================
echo.
git remote set-url origin https://kishan811@github.com/kishan811/thebitechapter.git

echo If a browser window opens, please confirm/sign in as kishan811.
echo.
git push -u origin main

if %ERRORLEVEL% NEQ 0 (
    echo.
    echo ===================================================================
    echo   [ERROR] Push failed.
    echo.
    echo   If it says "Permission denied to kishanility":
    echo   Windows has your work credentials (kishanility) saved in Git Credential Manager.
    echo.
    echo   EASIEST 10-SECOND FIX:
    echo   Open: https://github.com/kishan811/thebitechapter/settings/access
    echo   Click "Add people" and add "kishanility" as a Collaborator with Write access!
    echo   Then re-run this script, and it will push in 2 seconds!
    echo ===================================================================
) else (
    echo.
    echo ===================================================================
    echo   [SUCCESS] Code pushed successfully to kishan811/thebitechapter!
    echo.
    echo   Next Step for FREE Live URL:
    echo   1. Open: https://github.com/kishan811/thebitechapter/settings/pages
    echo   2. Under "Branch", select "main" and click "Save".
    echo   3. Your live URL will be:
    echo      https://kishan811.github.io/thebitechapter/
    echo ===================================================================
)
pause
