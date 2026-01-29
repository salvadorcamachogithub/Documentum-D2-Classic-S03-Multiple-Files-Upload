' Launch the specified browser: "chrome.exe", "iexplore.exe", "msedge.exe", etc.
SystemUtil.Run DataTable("p_browser", dtGlobalSheet)

' Set the browser as the AI context for AI-based operations
AIUtil.SetContext Browser("creationtime:=0")

' Navigate to the desired URL
Browser("creationtime:=0").Navigate DataTable("p_url", dtGlobalSheet)

' Sign in
AIUtil("text_box", "User name").Type DataTable("p_username", dtGlobalSheet)
AIUtil("text_box", "Password").TypeSecure DataTable("p_password", dtGlobalSheet)
' Timing Sign In Transaction
Services.StartTransaction "Documentum D2-Classic-S03-01 Sign In"
AIUtil("button", "Sign in").Click
' Validation
AIUtil("down_triangle", micAnyText, micFromBottom, 1).CheckExists True
Services.EndTransaction "Documentum D2-Classic-S03-01 Sign In"

'Documentum Authentication
AIUtil("down_triangle", micAnyText, micFromBottom, 1).Click
AIUtil.FindTextBlock("ePersonnel Files").Click
AIUtil("button", "", micFromBottom, 1).Click

 ' Start file importing
AIUtil.FindTextBlock("IMPORT").Click
AIUtil.FindTextBlock("File").Click

 ' Multiple files upload
Browser("OpenText™ | Documentum™").Page("OpenText™ | Documentum™").WebElement("browse").Click
Window("Google Chrome").Dialog("Open").WinObject("Items View").WinList("Items View").Select "arbitration.pdf" @@ hightlight id_;_1900746120_;_script infofile_;_ZIP::ssf4.xml_;_
Window("Google Chrome").Dialog("Open").WinObject("Items View").WinList("Items View").ExtendSelect "D2_Version_v1.docx" @@ hightlight id_;_1900746120_;_script infofile_;_ZIP::ssf5.xml_;_
Window("Google Chrome").Dialog("Open").WinObject("Items View").WinList("Items View").ExtendSelect "de4.pdf" @@ hightlight id_;_1900746120_;_script infofile_;_ZIP::ssf6.xml_;_
Window("Google Chrome").Dialog("Open").WinObject("Items View").WinList("Items View").ExtendSelect "dir_deposit.gif" @@ hightlight id_;_1900746120_;_script infofile_;_ZIP::ssf7.xml_;_
Window("Google Chrome").Dialog("Open").WinObject("Items View").WinList("Items View").ExtendSelect "Emergency Contact.pdf" @@ hightlight id_;_1900746120_;_script infofile_;_ZIP::ssf8.xml_;_
Window("Google Chrome").Dialog("Open").WinObject("Items View").WinList("Items View").ExtendSelect "offer_letter.pdf" @@ hightlight id_;_1900746120_;_script infofile_;_ZIP::ssf9.xml_;_
Window("Google Chrome").Dialog("Open").WinObject("Items View").WinList("Items View").ExtendSelect "resume.pdf" @@ hightlight id_;_1900746120_;_script infofile_;_ZIP::ssf10.xml_;_
Window("Google Chrome").Dialog("Open").WinObject("Items View").WinList("Items View").ExtendSelect "Some Text File 2026.01.txt" @@ hightlight id_;_1900746120_;_script infofile_;_ZIP::ssf11.xml_;_
Window("Google Chrome").Dialog("Open").WinObject("Items View").WinList("Items View").ExtendSelect "Vacation Request-029501-0008.doc" @@ hightlight id_;_1900746120_;_script infofile_;_ZIP::ssf12.xml_;_
Browser("OpenText™ | Documentum™").Page("OpenText™ | Documentum™").WebFile("WebFile").Set """Vacation Request-029501-0008.doc"" ""arbitration.pdf"" ""D2_Version_v1.docx"" ""de4.pdf"" ""dir_deposit.gif"" ""Emergency Contact.pdf"" ""offer_letter.pdf"" ""resume.pdf"" ""Some Text File 2026.01.txt""" @@ script infofile_;_ZIP::ssf13.xml_;_

' Mandatory fields to upload files
AIUtil("button", "Next").Click
AIUtil("check_box", "Apply same profile to remaining files").SetState "On"
AIUtil.FindTextBlock("Select a creation profile").Click
AIUtil.FindTextBlock("ePF Document").Click
AIUtil("combobox", "Doc Types:").Click
AIUtil.FindTextBlock("Personnel", micFromRight, 1).Click
AIUtil("button", "Next").Click
AIUtil("check_box", "Apply same properties to remaining files").SetState "On"
AIUtil("combobox", "Employee ID:").Click
AIUtil.FindTextBlock("029501", micFromTop, 3).Click
AIUtil("combobox", "").Click
AIUtil.FindTextBlock("Miscellaneous").Click
AIUtil("button", "Next").Click
AIUtil("button", "Check In and Finish").Click

' Timing Multiple Uploads
Services.StartTransaction "Documentum D2-Classic-S03-02 Upload Multiple Documents"
' Wait for uploading, max 60 seconds
If Browser("OpenText™ | Documentum™").Page("OpenText™ | Documentum™").WebElement("029501-misc").Exist(60) Then
	Reporter.ReportEvent micPass, "Upload Verification", "All files were uploaded before 60 seconds"
Else
	Reporter.ReportEvent micFail, "Upload Verification", "It took longer than 60 seconds to upload all files"
End If
Services.EndTransaction "Documentum D2-Classic-S03-02 Upload Multiple Documents"

' Wait to see it better
wait(3)

' Delete ALL files
' Hold SHIFT and press UP 8 times
Set WshShell = CreateObject("WScript.Shell")
WshShell.SendKeys "+{UP 8}"
' Wait to see it better
wait(3)
' Send Shift+F10 (+ represents Shift, {F10} represents F10), this simulates right click
WshShell.SendKeys "+{F10}"
' Wait to see it better
wait(3)

AIUtil.FindTextBlock("Delete").Click
AIUtil("radio_button", "Delete all versions").SetState "On"
AIUtil("button", "OK for all").Click

Dim startTime, timeout
startTime = Timer
timeout = 60 ' Maximum wait time in seconds

' Wait to make sure all is done before next step
' Loop until the element is not found or the timeout is reached
' Timing Deletion
Services.StartTransaction "Documentum D2-Classic-S03-03 All Files Deletion"
Do While AIUtil("button", "OK for all").Exist(0)
    If Timer - startTime > timeout Then
        Exit Do ' Exit loop on timeout
    End If
    Wait(0.5) ' Wait 0.5 seconds before re-checking
Loop
Services.EndTransaction "Documentum D2-Classic-S03-03 All Files Deletion"

' Log out
AIUtil("profile").Click
' Timing Logout
Services.StartTransaction "Documentum D2-Classic-S03-04 Logout"
AIUtil.FindTextBlock("Logout").Click
AIUtil("button", "Sign in").CheckExists True
Services.EndTransaction "Documentum D2-Classic-S03-04 Logout"

' Closing Browser
Browser("creationtime:=0").Close
