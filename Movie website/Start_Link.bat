@echo off
echo Starting local server on port 5000...
start cmd /k "npx serve . -p 5000"
echo.
echo Creating live link via Localtunnel...
echo Note: When you open the link on your phone, you might see a "Localtunnel" landing page. 
echo Just click "Click to Continue" or enter your computer's IP if asked.
npx localtunnel --port 5000
pause
