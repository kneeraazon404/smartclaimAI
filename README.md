
# AI-Powered Medical Billing Compliance App

This project is a web application that allows users to input medical wound care data and receive real-time compliance feedback based on LCD Novitas Medicare guidelines. It is built using:

- **Frontend:** Next.js + Tailwind CSS
- **Backend:** Django + Django REST Framework
- **Database:** SQLite (for now)

---

## ✅ Project Tasks Breakdown

### 1. Project Setup (Frontend & Backend)

- [ ] Initialize a Next.js project.
- [ ] Set up Tailwind CSS in the frontend.
- [ ] Initialize a Django project.
- [ ] Install Django REST Framework (DRF) and configure it.
- [ ] Create a Django app (e.g., `checklist`).
- [ ] Set SQLite in `settings.py` (default).
- [ ] Test that both servers (Next.js and Django) run without errors.

---

### 2. Input Form Creation (Based on Checklist)

- [ ] Build a form UI in Next.js that mirrors `Checklist.docx`.
- [ ] Include:
  - Yes/No toggles or checkboxes.
  - Text/number fields for dates and measurements.
  - Dropdowns or free text where needed.
- [ ] Divide form into sections:
  - General
  - DFU (Diabetic Foot Ulcers)
  - VLU (Venous Stasis Ulcers)
  - Other Wounds
- [ ] Use Tailwind CSS for styling.
- [ ] Manage form state using React (`useState` or form library).
- [ ] Add client-side validation for required fields.

---

### 3. Database Modeling & API Endpoints

- [ ] Create Django models matching all checklist fields.
- [ ] (Optional) Add models for predefined rules/thresholds.
- [ ] Run migrations.
- [ ] Create DRF serializers for form submission.
- [ ] Create DRF views/viewsets:
  - POST: Submit form for validation.
  - GET: (Optional) Fetch past entries or static data.
- [ ] Register API URLs.

---

### 4. Frontend/Backend Integration

- [ ] Add CORS support (`django-cors-headers`).
- [ ] Set backend URL in frontend (e.g., `.env.local`).
- [ ] Connect form submission with API (`fetch` or Axios).
- [ ] Send JSON with proper headers.
- [ ] Verify communication (fix CORS or network issues if needed).

---

### 5. Validation Logic Implementation (from LCD)

- [ ] Parse the LCD Novitas document into rule checks like:
  - Wound present >4 weeks.
  - At least 50% improvement.
  - Adequate circulation (ABI ≥ 0.60 or toe pressure > 30 mmHg).
  - Clean wound (no infection or osteomyelitis).
  - Offloading/compression measures in use.
  - Diabetic diagnosis and management for DFUs.
  - Smoking cessation documented.
- [ ] Implement these checks in Django:
  - Use `serializer.validate()` or custom logic in views.
- [ ] Return validation results (pass/fail + detailed reasons).

---

### 6. Real-Time Feedback Mechanism

- [ ] Add frontend logic to trigger API validation on change.
- [ ] (Optional) Create a `/validate` endpoint for live validation.
- [ ] Debounce API calls to reduce spam.
- [ ] Show validation results:
  - Green check ✅ for passed fields.
  - Red ❌ for failed ones with reasons.
- [ ] Make feedback responsive, clean, and non-blocking.

---

### 7. Result Display & Summary

- [ ] Add a summary component to show overall outcome.
- [ ] Show checklist of:
  - ✅ Criteria Met
  - ❌ Criteria Not Met (with reasons)
- [ ] Use Tailwind to style this clearly.
- [ ] Make summary update in real-time when form changes.

---

### 8. Testing & Polish

- [ ] Write unit tests for validation rules.
- [ ] Test APIs with Postman or Django Test Client.
- [ ] Manually test input combos for accuracy.
- [ ] Fix bugs and polish UI with Tailwind.
- [ ] Ensure mobile responsiveness and accessibility.
- [ ] Update README with setup instructions.
- [ ] (Optional) Prepare for deployment.

---

## 📁 Folder Suggestions

- `/frontend` – Next.js app
- `/backend` – Django + DRF app

---

## ⚙️ Tech Stack

| Layer        | Technology         |
|--------------|--------------------|
| Frontend     | Next.js + Tailwind |
| Backend      | Django + DRF       |
| Database     | SQLite             |
| Validation   | Based on Medicare LCD rules |
| Hosting (opt)| Vercel / Render / DigitalOcean |

---

## 🚀 Future Improvements (Optional)

- Add authentication (doctors/admin login).
- Add historical reports.
- Export compliance results to PDF.
- Switch to PostgreSQL or another DB.
- Add analytics dashboard.

---

## 🧪 Example Rule
>
> **Rule:** Wound must show ≥50% healing after 4 weeks.
> **Pass:** "Wound healing progress is satisfactory."
> **Feedback:** "Wound healing progress is satisfactory."
> **Action:** "Continue current treatment plan."
> **Fail:** "Wound healing progress is unsatisfactory."
> **Feedback:** "Wound healing progress is unsatisfactory."
> **Action:** "Consider alternative treatment options."
> **Note:** This is a simplified example. Actual rules may vary.
> **Source:** LCD Novitas Medicare guidelines.
