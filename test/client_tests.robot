*** Settings ***
Documentation   Testailua
Library         SeleniumLibrary
Test Setup      Open Browser    ${URL}  ${BROWSER}  profile=accept_untrusted_certs = True
Test Teardown   Close Browser


*** Variables ***
${URL}          http://localhost:3000
${INVALID_URL}  http://localhost:3000/testi
${BROWSER}      Firefox
${TITLE}        Exam App
${USERNAME}     testik
${PASSWORD}     testi
${INVALID_PASSWORD}     tetsi


*** Test Cases ***
Valid Website
    Site Title

Invalid Page
    [Setup]         Open Invalid Page
    Invalid Page
    [Teardown]      Close Browser

Valid Login
    Login
    Exams Visible

Invalid Login
    Login Invalid Password
    Exams Not Visible

Valid Logout
    Login
    Logout
    Exams Not Visible

Valid Exam Insertion
    Login
    Navigate To Exams
    Exam Insertion

Valid Exam Deletion
    Login
    Navigate To Exams
    Exam Deletion

*** Keywords ***
Site Title
    Title Should Be     ${TITLE}

Open Invalid Page
    Open Browser        ${INVALID_URL}  ${BROWSER}  profile=accept_untrusted_certs = True

Invalid Page
    Element Should Be Visible    id=not-found

Login
    Click Element       id=login
    Input Text          id=user     ${USERNAME}
    Input Text          id=pass     ${PASSWORD}
    Click Button        id=login-submit

Login Invalid Password
    Click Element       id=login
    Input Text          id=user     ${USERNAME}
    Input Text          id=pass     ${INVALID_PASSWORD}
    Click Button        id=login-submit

Exams Visible
    Element Should Be Visible    id=exams-link

Exams Not Visible
    Element Should Not Be Visible    id=exams-link

Logout
    Click Element    id=logout-button

Navigate To Exams
    Click Element    id=exams-link
    Location Should Be    http://localhost:3000/admin/exams
    
Exam Insertion
    Click Button    id=add-exam-button
    Input Text    id=add-exam-input    seleniumtesti
    Click Button    id=submit-add-exam
    Element Should Be Visible    id=seleniumtesti

Exam Deletion
    Click Button    id=delete-seleniumtesti
    Element Should Not Be Visible    id=seleniumtesti