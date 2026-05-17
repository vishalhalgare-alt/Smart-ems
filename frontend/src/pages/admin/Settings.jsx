import { useState, useEffect } from "react";
import { FaCheck, FaExclamationTriangle, FaSave } from "react-icons/fa";
import PageHeader from "../../components/common/PageHeader";
import SectionCard from "../../components/common/SectionCard";
import ActionButton from "../../components/common/ActionButton";
import "../../styles/admin-settings.css";

export default function Settings() {
  const [toast, setToast] = useState("");
  const [settings, setSettings] = useState({
    companyName: "Smart EMS",
    companyEmail: "admin@smartems.com",
    supportEmail: "support@smartems.com",
    companyPhone: "+1 (555) 123-4567",
    timezone: "UTC",
    dateFormat: "DD/MM/YYYY",
    timeFormat: "24h",
    currency: "USD",
    language: "English",
    twoFactorAuth: true,
    emailNotifications: true,
    sessionTimeout: 30,
    backupFrequency: "Daily",
    apiLogging: true,
    dataRetention: 90,
  });

  const [unsaved, setUnsaved] = useState(false);
  const [saving, setSaving] = useState(false);

  // Load settings from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem("appSettings");
    if (saved) {
      setSettings(JSON.parse(saved));
    }
  }, []);

  const handleInputChange = (field, value) => {
    setSettings((prev) => ({ ...prev, [field]: value }));
    setUnsaved(true);
  };

  const handleToggle = (field) => {
    setSettings((prev) => ({ ...prev, [field]: !prev[field] }));
    setUnsaved(true);
  };

  const handleSave = async () => {
    setSaving(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 500));
    localStorage.setItem("appSettings", JSON.stringify(settings));
    setUnsaved(false);
    setSaving(false);
    setToast("Settings saved successfully!");
    setTimeout(() => setToast(""), 3000);
  };

  const handleReset = () => {
    const saved = localStorage.getItem("appSettings");
    if (saved) {
      setSettings(JSON.parse(saved));
    }
    setUnsaved(false);
  };

  return (
    <>
      <PageHeader
        eyebrow="Admin Workspace"
        title="Settings"
        description="Configure company profile, security, notifications, theme preferences, and backups."
      />

      {/* COMPANY PROFILE */}
      <SectionCard
        eyebrow="Configuration"
        title="Company Profile"
        action={
          <div className="settings-actions">
            {unsaved && <span className="unsaved-indicator">Unsaved Changes</span>}
            <ActionButton
              className="action-button--primary"
              onClick={handleSave}
              disabled={!unsaved || saving}
            >
              <FaSave /> {saving ? "Saving..." : "Save Changes"}
            </ActionButton>
          </div>
        }
      >
        <div className="settings-grid">
          <div className="settings-field">
            <label>Company Name</label>
            <input
              type="text"
              value={settings.companyName}
              onChange={(e) => handleInputChange("companyName", e.target.value)}
              placeholder="Enter company name"
            />
          </div>
          <div className="settings-field">
            <label>Company Email</label>
            <input
              type="email"
              value={settings.companyEmail}
              onChange={(e) => handleInputChange("companyEmail", e.target.value)}
              placeholder="Enter company email"
            />
          </div>
          <div className="settings-field">
            <label>Support Email</label>
            <input
              type="email"
              value={settings.supportEmail}
              onChange={(e) => handleInputChange("supportEmail", e.target.value)}
              placeholder="Enter support email"
            />
          </div>
          <div className="settings-field">
            <label>Company Phone</label>
            <input
              type="tel"
              value={settings.companyPhone}
              onChange={(e) => handleInputChange("companyPhone", e.target.value)}
              placeholder="Enter company phone"
            />
          </div>
        </div>
      </SectionCard>

      {/* REGIONAL SETTINGS */}
      <SectionCard eyebrow="Configuration" title="Regional Settings">
        <div className="settings-grid">
          <div className="settings-field">
            <label>Timezone</label>
            <select
              value={settings.timezone}
              onChange={(e) => handleInputChange("timezone", e.target.value)}
            >
              <option>UTC</option>
              <option>EST</option>
              <option>CST</option>
              <option>MST</option>
              <option>PST</option>
              <option>GMT</option>
            </select>
          </div>
          <div className="settings-field">
            <label>Date Format</label>
            <select
              value={settings.dateFormat}
              onChange={(e) => handleInputChange("dateFormat", e.target.value)}
            >
              <option>DD/MM/YYYY</option>
              <option>MM/DD/YYYY</option>
              <option>YYYY-MM-DD</option>
            </select>
          </div>
          <div className="settings-field">
            <label>Time Format</label>
            <select
              value={settings.timeFormat}
              onChange={(e) => handleInputChange("timeFormat", e.target.value)}
            >
              <option>24h</option>
              <option>12h</option>
            </select>
          </div>
          <div className="settings-field">
            <label>Currency</label>
            <select
              value={settings.currency}
              onChange={(e) => handleInputChange("currency", e.target.value)}
            >
              <option>USD</option>
              <option>EUR</option>
              <option>GBP</option>
              <option>INR</option>
              <option>JPY</option>
            </select>
          </div>
          <div className="settings-field">
            <label>Language</label>
            <select
              value={settings.language}
              onChange={(e) => handleInputChange("language", e.target.value)}
            >
              <option>English</option>
              <option>Spanish</option>
              <option>French</option>
              <option>German</option>
              <option>Hindi</option>
            </select>
          </div>
        </div>
      </SectionCard>

      {/* SECURITY SETTINGS */}
      <SectionCard eyebrow="Security" title="Authentication & Security">
        <div className="settings-toggles">
          <div className="settings-toggle">
            <div>
              <h4>Two-Factor Authentication</h4>
              <p>Require 2FA for all admin accounts</p>
            </div>
            <label className="toggle-switch">
              <input
                type="checkbox"
                checked={settings.twoFactorAuth}
                onChange={() => handleToggle("twoFactorAuth")}
              />
              <span className="toggle-slider"></span>
            </label>
          </div>

          <div className="settings-toggle">
            <div>
              <h4>Email Notifications</h4>
              <p>Send security alerts via email</p>
            </div>
            <label className="toggle-switch">
              <input
                type="checkbox"
                checked={settings.emailNotifications}
                onChange={() => handleToggle("emailNotifications")}
              />
              <span className="toggle-slider"></span>
            </label>
          </div>

          <div className="settings-toggle">
            <div>
              <h4>API Logging</h4>
              <p>Log all API requests and responses</p>
            </div>
            <label className="toggle-switch">
              <input
                type="checkbox"
                checked={settings.apiLogging}
                onChange={() => handleToggle("apiLogging")}
              />
              <span className="toggle-slider"></span>
            </label>
          </div>
        </div>

        <div className="settings-grid" style={{ marginTop: "24px" }}>
          <div className="settings-field">
            <label>Session Timeout (minutes)</label>
            <input
              type="number"
              min="5"
              max="300"
              value={settings.sessionTimeout}
              onChange={(e) => handleInputChange("sessionTimeout", parseInt(e.target.value))}
            />
          </div>
        </div>
      </SectionCard>

      {/* DATA MANAGEMENT */}
      <SectionCard eyebrow="Data" title="Data Management & Backups">
        <div className="settings-grid">
          <div className="settings-field">
            <label>Backup Frequency</label>
            <select
              value={settings.backupFrequency}
              onChange={(e) => handleInputChange("backupFrequency", e.target.value)}
            >
              <option>Hourly</option>
              <option>Daily</option>
              <option>Weekly</option>
              <option>Monthly</option>
            </select>
          </div>
          <div className="settings-field">
            <label>Data Retention (days)</label>
            <input
              type="number"
              min="7"
              max="365"
              value={settings.dataRetention}
              onChange={(e) => handleInputChange("dataRetention", parseInt(e.target.value))}
            />
          </div>
        </div>

        <div style={{ marginTop: "24px", display: "flex", gap: "12px" }}>
          <ActionButton className="action-button--secondary">
            Create Backup Now
          </ActionButton>
          <ActionButton className="action-button--secondary">
            View Backups
          </ActionButton>
        </div>
      </SectionCard>

      {/* TOAST MESSAGE */}
      {toast && (
        <div className="settings-toast">
          <FaCheck /> {toast}
        </div>
      )}

      {/* BUTTON GROUP */}
      {unsaved && (
        <div className="settings-button-group">
          <ActionButton className="action-button--secondary" onClick={handleReset}>
            Discard Changes
          </ActionButton>
        </div>
      )}
    </>
  );
}
