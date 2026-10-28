# GYN Brachy EQD2

Cumulative EQD2 and BED calculator for gynaecological radiotherapy: external beam plus vaginal cylinder, intrauterine and interstitial HDR brachytherapy.

**Version 1.1.0**

- Designed by **Medical Physicist Ali Eid**
- Supervised by **Dr. Zainab Alhaddad**
- Tested by **Medical Physicist Hamad Almannai** and the **Radiation Oncology team**

© 2026 Medical Physicist Ali Eid. All rights reserved.

**Live app:** https://ali023273834.github.io/BOC_Brachy_EQD2/

---

## Features

- **Patient records:** each patient (name and CPR) keeps their external beam, every delivered brachytherapy fraction with its date, the constraints and the course settings. Records are saved automatically on the device, can be searched by name or CPR, and can be exported as a patient file or backed up all at once.
- **Session workflow:** delivered fractions are locked. At each session you open the patient and enter only today's plan; results update as you type. When the fraction is treated, select **Mark as delivered**. **Reopen** corrects the last delivered fraction.
- **External beam:** Phase 1 and optional Phase 2 boost. BED and EQD2 per structure, with a per-structure dose override (midline block, nodal boost).
- **Brachytherapy:** vaginal cylinder, intrauterine, or interstitial; 1–6 fractions. You enter the physical dose per fraction for HR-CTV D90 and for bladder, rectum, sigmoid and bowel D2cc.
- **Cumulative EQD2:** the running EBRT + brachy total after each fraction, with total BED and a status for each structure.
- **Dose left for the remaining fractions:** the remaining EQD2 budget and the maximum physical dose per fraction for each organ, with today's plan checked against those values. For the target, the minimum dose per fraction still needed.
- **Prescription adjustment estimate:** the highest prescription per fraction that keeps every organ within its constraint, the limiting organ, and the minimum prescription the target needs. It recommends lowering or raising the prescription and shows a projected final EQD2 at a test prescription. The change can apply to all remaining fractions or to the last fraction only. While today's plan is entered, organ ratios come from that plan; otherwise they are averaged over the delivered fractions.
- **Constraints:** Optimal / Acceptable for the target, Preferred / Maximum for organs. Presets follow EMBRACE II / GEC-ESTRO and can be edited.
- **PDF report:** includes patient name, CPR, the report date, every delivered fraction with its date, today's plan (marked as not yet delivered), the prescription estimate and signature lines.
- **Privacy:** records stay in this browser on this device. Nothing is sent to a server.
- **Install and offline use:** installable on Windows, Mac, iPhone and Android, and works without a connection after the first open.

## Patient records: how storage works

- Records are kept in the browser's storage for this app, on this device only. A different computer or browser has its own separate list.
- To continue a patient on another computer, open the patient, select **Details → Export patient file**, then on the other computer select **Patients → Import patient file**. On import, a newer record replaces an older one with the same CPR.
- **Back up all patients** saves one file with every record. Keep backups on the department drive. Clearing the browser's data, or uninstalling the app, deletes the records on that device.
- Patient files contain names and CPR numbers. Store and share them according to the hospital's data protection policy.

## Radiobiology

```
BED  = n · d · (1 + d / (α/β))
EQD2 = BED / (1 + 2 / (α/β))
```

The model is linear-quadratic, assumes complete repair between fractions, and applies no correction for overall treatment time. Default α/β is 10 Gy for the target and 3 Gy for organs at risk.

The de-escalation estimate assumes the next plan uses the same applicator geometry, so organ doses scale in proportion to the prescription. The organ-to-prescription ratio is averaged over the delivered fractions.

## Repository contents

All files sit in the repository root, with no subfolders.

| File | Purpose |
|---|---|
| `index.html` | The complete application |
| `manifest.webmanifest` | App name, icons and colours for installation |
| `sw.js` | Service worker for offline use and installation |
| `icon-192.png`, `icon-512.png`, `icon-maskable-512.png` | App icons for Windows, Mac and Android |
| `apple-touch-icon.png` | iPhone Home Screen icon |
| `jspdf.umd.min.js`, `jspdf.plugin.autotable.min.js` | PDF export libraries |
| `THIRD-PARTY-NOTICES.txt` | MIT licences of the PDF libraries |
| `.nojekyll` | Tells GitHub Pages to serve the files as they are |
| `LICENSE` | Copyright and disclaimer |

## Publish or update on GitHub Pages

1. Open the repository on GitHub and choose **Add file → Upload files**.
2. Select **all 13 files** and drag them in together, then select **Commit changes**. Existing files with the same name are replaced.
3. Check that the file list on GitHub shows all of the files above, including the four icons and the two `jspdf` files.
4. First time only: go to **Settings → Pages** and set Source to **Deploy from a branch**, Branch to **main**, and folder to **/ (root)**.

`.nojekyll` is hidden on Windows and Mac. If it doesn't upload, choose **Add file → Create new file**, name it `.nojekyll`, leave it empty, and commit.

## Install on Windows (Edge or Chrome)

1. Open the live app link.
2. **Edge:** select the **App available** icon in the address bar, or go to **… → Apps → Install this site as an app**.
3. **Chrome:** select the **Install** icon in the address bar, or go to **⋮ → Cast, save and share → Install page as app**.
4. The app opens in its own window and appears in the Start menu.

If the install option doesn't appear, press **Ctrl + F5** once to reload the latest version, then try again.

## Install on iPhone

1. Open the live app link in **Safari**.
2. Tap **Share → Add to Home Screen → Add**.
3. Open it once while online. After that it also works offline.

On iPhone, **Export PDF report** opens the share sheet, where you can **Save to Files**, print or send the report.

## Releasing a new version

1. Upload the changed files.
2. In `sw.js`, raise `CACHE_VERSION`, for example `gyn-eqd2-v1.1.1`, and upload it too.
3. Installed copies update the next time they are opened online. Closing and reopening the app may be needed.

## Disclaimer

This application is a calculation aid. It does not replace the treatment planning system, independent dose verification, or the clinical judgement of the treating radiation oncologist and medical physicist. Confirm all constraints against your departmental protocol.
