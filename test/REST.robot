*** Settings ***
Library     RequestsLibrary
Test Setup
*** Test Cases ***
Connect
    Connect

Valid GET Request
    Quick Get Request Test

Invalid GET Request
    Bad Request Test

*** Keywords ***
Connect
    Create Client Cert Session    cert    url=https://localhost:8080    verify=${false}

Quick Get Request Test
    GET On Session      alias=cert     url=https://localhost:8080/

Bad Request Test
    GET On Session      alias=cert     url=https://localhost:8080/exams