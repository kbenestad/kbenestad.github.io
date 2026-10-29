# Versions

| Version | Date       | Description   |
| ------- | ---------- | ------------- |
| v0.1.0  | 2026-10-19 | First version |
| v0.2.0  | 2026-10-20 | App names, search and filters, debloat labels toggle, optional live list; list now updated by workflow |
| v0.2.1  | 2026-10-20 | Connect button shows which step is waiting (B006) |
| v0.3.0 | 2026-10-21 | Device cards have icons;  Network card can detect the public IP address on click; Device page redesigned as cards with battery, storage, temperature and network |
| v0.4.0 | 2026-10-23 | light, dark or system colour mode (Appearance) |
| v0.5.0 | 2026-10-23 | new Device page with gauges, tabs and downloadable reports (HTML, Markdown, JSON) |
| v0.6.0 | 2026-10-23 | Shell is locked behind the Allow unsafe operations setting again; Shell asks before running a command and accepts "adb shell" commands; Allow unsafe operations setting;  Shell shows a warning until it is ticked; Shell panel to run commands on the phone |
| v0.6.1 | 2026-10-23 | Shell is a sidebar section instead of a bottom panel |
| v0.7.0 | 2026-10-23 | optional data folder with per-phone profile files;  debloat labels off by default |
| v0.8.0 | 2026-10-24 | Preferences shows the app version and last updated date; Shell no longer freezes on commands that wait for input or print a lot, and Stop always frees the screen; Shell shows a muted suggestion;  Tab accepts it |
| v0.8.1 | 2026-10-24 | connection error says adb kill-server is for a terminal and only if adb is installed, and suggests unplugging and replugging the phone |
| v0.8.2 | 2026-10-24 | removed the Download the latest debloat list option;  the list comes from this site only; Connect screen rewritten with data folder and USB debugging steps, buttons centred |
| v0.8.3 | 2026-10-24 | Connect phone and data folder buttons are the same height |
| v0.8.4 | 2026-10-24 | Connect screen shows a note under the data folder, heading is Phone, and former code text is italic |
| v0.8.5 | 2026-10-24 | Signal level help text says the carrier sets each threshold; Battery temperature help text uses °C on every figure; Device page help text clarified;  network type shows 4G (LTE) and 5G instead of LTE and NR |
| v0.9.0 | 2026-10-24 | Managed by an organisation help text covers work profiles on personal phones; Managed by an organisation help text says companies and schools may have access to data on the phone; Security patch help text says to check for an update when the patch is 1 to 3 months old or older; Security patch help text says what to do if the patch is more than 3 months old; Bootloader help text explains what locked and unlocked mean for banking apps, rooting and other operating systems; Preferences has a Metric or Imperial switch (temperature in °C or °F);  the snapshot time shows the computer's time zone, like UTC+7 |
| v0.10.0 | 2026-10-24 | Packages shows and changes apps for every user on the phone |
| v0.11.0 | 2026-10-24 | Rename an app in Packages;  the name is kept in the phone's profile |
| v0.12.0 | 2026-10-24 | Packages can uninstall and install apps per user, act on several ticked apps at once, and filter by developer and name; Packages rows and details line up in columns, as in the sketch |
| v0.13.0 | 2026-10-25 | Rename a developer in Packages;  the name is kept in the phone's profile |
| v0.13.1 | 2026-10-25 | Security patch status merged with latest main; Security patch shows Good (under 3 months, green), Check updates (3 to 12 months, amber) or Outdated - check updates (over 12 months, red) |
| v0.14.0 | 2026-10-25 | Logs section with topics (crashes, app, Bluetooth, battery, Wi-Fi, mobile, USB), live view, save and copy, and optional hiding of personal details |
| v0.15.0 | 2026-10-25 | Logs shows a list of hidden values and finds them by label;  Save as report makes an HTML log viewer with filters;  Crashes and One app filters are quieter;  Logs keep up to 300 000 lines |
| v0.16.0 | 2026-10-25 | Performance section with live dials for CPU, memory, temperature, storage and battery, and line charts of the last 5, 15 or 60 minutes |
| v0.17.0 | 2026-10-25 | Files section to browse the phone, see file details, download or share files, keep notes on files, and (with unsafe operations on) upload, rename, move, copy and delete |
| v0.18.0 | 2026-10-25 | Comments can be edited (marked as edited, earlier versions stay visible) and follow a file when it is renamed or moved in Files; Review comments on files: signed with your own key kept in the data folder (optional generated passphrase), saved on the phone, a Comments section with filters, and a Reviewed by label in Files |
| v0.19.0 | 2026-10-25 | Settings section to read and change phone settings by topic (display, sound, connectivity, privacy, input, developer, power) with a list of every key, per-user values, a connection check provider choice, a snapshot to compare against, and risky changes locked behind unsafe operations |
| v0.19.1 | 2026-10-25 | the off button in the top bar appears when Connect phone is pressed and aborts the connection attempt |
| v0.20.0 | 2026-10-25 | Files details pane, text editor, image viewer, context menu, batch rename |
| v0.21.0 | 2026-10-25 | Performance charts can be enlarged to full width or full page and saved as SVG or PNG;  the readings of the last 5, 15 or 60 minutes can be downloaded as CSV, HTML or text;  the 5/15/60 min switch moved next to Now/History |
| v0.21.1 | 2026-10-25 | Logs no longer hides names like androidx.work.systemjobscheduler@com.nextcloud.client as email addresses;  clearer text for Hide personal details and the hidden values list |
| v0.21.2 | 2026-10-25 | Settings switches use the design system switch without the browser button border, help text lines up with the title, and the key, Previous and Undo sit on one line |
| v0.21.3 | 2026-10-25 | Files details pane is wider and has Data and Comments tabs; Files path bar has no outline until you click it |
| v0.21.4 | 2026-10-25 | Packages buttons are Rename app and Rename developer, side by side;  Rename developer also shows for apps with no developer |
| v0.22.0 | 2026-10-25 | Files double-click opens pictures in the viewer and text files in the editor |
| v0.22.1 | 2026-10-25 | confirm dialog buttons (delete, packages, shell) are full height and sit side by side when there is room |
| v0.22.2 | 2026-10-25 | power button on the right in every section;  top-bar search in Files, Logs, Comments and Settings as an extra filter; power button on the right in every section;  one shared top-bar search for Packages, Files, Logs, Comments and Settings |
| v0.22.3 | 2026-10-25 | the button that hides the Files details pane is in the pane header;  the top bar shows it only while the pane is hidden |
| v0.23.0 | 2026-10-25 | the profile copies on the phone and the computer are merged entry by entry, using a time on every entry; the profile (app and developer names, settings snapshot) is also saved on the phone in Documents/WebADB/profile.json and read on connect;  the newer copy wins |
| v0.23.1 | 2026-10-26 | the profile saved on the phone is read on connect even if it has no modified time |
| v0.24.0 | 2026-10-27 | Apps section to search F-Droid and IzzyOnDroid, filtered by the phone's SDK, and install APKs |
| v0.25.0 | 2026-10-27 | Apps works from an apks folder in the data folder: reads APKs, ticks apps to install (greyed out when the phone is too old), exports and imports the list, and shows updates; Apps download opens the source link when F-Droid blocks the browser from reading it, and a failed install explains what to do |
| v0.26.0 | 2026-10-28 | Apps has Local library and Repos tabs, shows each app's install status and source repo, pages the library, and lets you add, export and import repos |
| v0.27.0 | 2026-10-28 | click anywhere on a Files row to open the folder or show the file; rename, download and delete a picture while it is open in the viewer |
| v0.27.1 | 2026-10-28 | viewer picture no longer pushes Rename, Download and Delete out of sight |
| v0.28.0 | 2026-10-29 | Actions section |
| v0.29.0 | 2026-10-29 | Packages batch progress; Force stop in Packages |
| v0.29.1 | 2026-10-29 | Modify swipe has a wait after waking the screen; PIN entry has a Sequence row (Wake screen, Send swipe, Press enter) |
| v0.29.2 | 2026-10-29 | Packages debloat options are right-aligned |
| v0.30.0 | 2026-10-29 | Apps shows apps installed for the chosen Android user and reports a failed read; Apps shows an app in several repos once, with a badge per repo;  repos can be reordered by drag or buttons, and a setting picks the newest version or the highest-ranked repo |
