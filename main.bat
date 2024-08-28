@echo off
title Batch File Menu Example
cls

:menu
echo ==============================
echo      Batch File Menu
echo ==============================
echo 1. Display Date and Time
echo 2. List Files in Current Directory
echo 3. Ping a Website
echo 4. Exit
echo ==============================
set /p choice=Enter your choice (1-4): 

if "%choice%"=="1" goto displayDateTime
if "%choice%"=="2" goto listFiles
if "%choice%"=="3" goto pingWebsite
if "%choice%"=="4" goto :eof

:displayDateTime
echo.
echo Current Date and Time:
echo.
echo %date% %time%
echo.
pause
goto menu

:listFiles
echo.
echo List of Files in Current Directory:
echo.
dir
echo.
pause
goto menu

:pingWebsite
set /p website=Enter the website to ping: 
echo.
ping %website%
echo.
pause
goto menu
