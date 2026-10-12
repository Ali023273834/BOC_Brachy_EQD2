# GYN Brachy EQD2

Cumulative EQD2 and BED calculator for gynaecological radiotherapy: external beam plus vaginal cylinder, intrauterine and interstitial HDR brachytherapy.

**Version 1.0**

- Designed by **Medical Physicist Ali Eid**
- Supervised by **Dr. Zainab Alhaddad**
- Tested and validated by **Medical Physicist Hamad Almannai** and the **Radiation Oncology team**

© 2026 Medical Physicist Ali Eid. All rights reserved.

---

## Features

- **External beam:** Phase 1 and optional Phase 2 boost. BED and EQD2 per structure, with a per-structure dose override (midline block, nodal boost).
- **Brachytherapy:** vaginal cylinder, intrauterine, or interstitial; 1–6 fractions. You enter the physical dose per fraction for HR-CTV D90 and for bladder, rectum, sigmoid and bowel D2cc.
- **Cumulative EQD2:** the running EBRT + brachy total after each fraction, with total BED and a status for each structure.
- **Dose left for the remaining fractions:** the remaining EQD2 budget and the maximum physical dose per fraction for each organ. For the target, the minimum dose per fraction still needed.
- **Prescription de-escalation estimate:** the highest prescription per fraction that keeps every organ within its constraint, the limiting organ, the minimum prescription the target needs, and a projected final EQD2 at a test prescription. It can apply the change to all remaining fractions or to the last fraction only.
- **Constraints:** Optimal / Acceptable for the target, Preferred / Maximum for organs. Presets follow EMBRACE II / GEC-ESTRO and can be edited.
- **PDF report:** includes patient name, CPR and date, all tables, the de-escalation estimate and signature lines. Name and CPR are required to export.
- **Privacy:** patient name and CPR are never stored in the browser. Only the dose worksheet is saved locally on the device.
- **Offline use:** installable on iPhone, Android and desktop, and works without a connection after the first open.

## Radiobiology

```
BED  = n · d · (1 + d / (α/β))
EQD2 = BED / (1 + 2 / (α/β))
```

The model is linear-quadratic, assumes complete repair between fractions, and applies no correction for overall treatment time. Default α/β is 10 Gy for the target and 3 Gy for organs at risk.

The de-escalation estimate assumes the next plan uses the same applicator geometry, so organ doses scale in proportion to the prescription. The organ-to-prescription ratio is averaged over the delivered fractions.

## Repository contents

| File | Purpose |
|---|---|
| `index.html` | The complete application |
| `manifest.webmanifest` | App name, icons and colours for installation |
| `sw.js` | Service worker for offline use |
| `icons/` | App icons, including the iPhone Home Screen icon |
| `vendor/` | jsPDF and jsPDF-AutoTable, bundled locally for PDF export |
| `.nojekyll` | Tells GitHub Pages to serve the files as they are |
| `LICENSE` | Copyright and disclaimer |

## Publish on GitHub Pages

1. On GitHub, create a new **public** repository, for example `GYN-EQD2`.
2. Choose **Add file → Upload files**. Drag in **all** files and folders from this package, keeping the `icons/` and `vendor/` folders as they are, then select **Commit changes**.
3. Go to **Settings → Pages**. Under *Build and deployment*, set Source to **Deploy from a branch**, Branch to **main**, and folder to **/ (root)**, then select **Save**.
4. Wait 1–2 minutes. The app will be live at `https://<your-username>.github.io/GYN-EQD2/`.

## Install on iPhone

1. Open the GitHub Pages link in **Safari**.
2. Tap **Share → Add to Home Screen → Add**.
3. Open it once while online. After that it also works offline.

To export a report on iPhone, tap **Export PDF report**. The share sheet opens, where you can **Save to Files**, print, or send the report.

## Updating the app

1. Upload the changed files to the repository.
2. In `sw.js`, raise `CACHE_VERSION`, for example `gyn-eqd2-v1.0.1`, and upload that file too.
3. Installed copies update the next time they are opened online. Closing and reopening the app may be needed.

## Disclaimer

This application is a calculation aid. It does not replace the treatment planning system, independent dose verification, or the clinical judgement of the treating radiation oncologist and medical physicist. Confirm all constraints against your departmental protocol.
