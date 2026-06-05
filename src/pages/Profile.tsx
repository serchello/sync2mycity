import { useEffect, useState } from "react";
import type { ReactNode } from "react";
import HeaderTitle from "../ui/HeaderTitle";
import "../styles/Profile.css";
import { useProfile, useUpdateProfile } from "../hooks/useProfile";
import type { ProfilePayload } from "../api/profileApi";

const EMPTY_PROFILE: ProfilePayload = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  address: "",
};

export default function Profile() {
  const { data, isLoading, error } = useProfile();
  const updateProfile = useUpdateProfile();

  const [profile, setProfile] = useState<ProfilePayload>(EMPTY_PROFILE);

  const [passwords, setPasswords] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [saved, setSaved] = useState(false);

  useEffect(() => {
    if (data) {
      setProfile(data);
    }
  }, [data]);

  const handleProfileChange = (field: keyof ProfilePayload, value: string) => {
    setProfile((prev) => ({
      ...prev,
      [field]: value,
    }));

    setSaved(false);
  };

  const handlePasswordChange = (
    field: keyof typeof passwords,
    value: string
  ) => {
    setPasswords((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSaveProfile = () => {
    updateProfile.mutate(profile, {
      onSuccess: () => {
        setSaved(true);
      },
      onError: () => {
        alert("Δεν ήταν δυνατή η αποθήκευση των στοιχείων");
      },
    });
  };

  const handleChangePassword = () => {
    if (!passwords.currentPassword || !passwords.newPassword) {
      alert("Συμπληρώστε τα πεδία κωδικού");
      return;
    }

    if (passwords.newPassword !== passwords.confirmPassword) {
      alert("Οι νέοι κωδικοί δεν ταιριάζουν");
      return;
    }

    console.log("Change password:", passwords);

    setPasswords({
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    });

    alert("Ο κωδικός ενημερώθηκε");
  };

  if (isLoading) {
    return (
      <div className="main-content">
        <div className="profile-page">
          <HeaderTitle title="Προφίλ Χρήστη" type="profile" />
          <div className="profile-card">Φόρτωση...</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="main-content">
        <div className="profile-page">
          <HeaderTitle title="Προφίλ Χρήστη" type="profile" />
          <div className="profile-card">
            Δεν ήταν δυνατή η φόρτωση του προφίλ.
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="main-content">
      <div className="profile-page">
        <div className="profile-header">
          <HeaderTitle title="Προφίλ Χρήστη" type="profile" />
        </div>

        <div className="profile-grid">
          <section className="profile-card">
            <div className="profile-card__header">
              <div>
                <h3>Προσωπικά στοιχεία</h3>
                <p>Ενημερώστε τα βασικά στοιχεία του λογαριασμού σας.</p>
              </div>

              {saved && <span className="profile-saved">Αποθηκεύτηκε</span>}
            </div>

            <div className="profile-avatar-block">
              <div className="profile-avatar">
                {profile.firstName.charAt(0) || "?"}
                {profile.lastName.charAt(0)}
              </div>

              <div>
                <p className="profile-avatar-name">
                  {profile.firstName} {profile.lastName}
                </p>
                <p className="profile-avatar-email">{profile.email}</p>
              </div>
            </div>

            <div className="profile-form">
              <div className="profile-row">
                <ProfileField label="Όνομα">
                  <input
                    type="text"
                    value={profile.firstName}
                    onChange={(event) =>
                      handleProfileChange("firstName", event.target.value)
                    }
                  />
                </ProfileField>

                <ProfileField label="Επώνυμο">
                  <input
                    type="text"
                    value={profile.lastName}
                    onChange={(event) =>
                      handleProfileChange("lastName", event.target.value)
                    }
                  />
                </ProfileField>
              </div>

              <ProfileField label="Email">
                <input
                  type="email"
                  value={profile.email}
                  onChange={(event) =>
                    handleProfileChange("email", event.target.value)
                  }
                />
              </ProfileField>

              <ProfileField label="Τηλέφωνο">
                <input
                  type="tel"
                  value={profile.phone}
                  onChange={(event) =>
                    handleProfileChange("phone", event.target.value)
                  }
                />
              </ProfileField>

              <ProfileField label="Διεύθυνση">
                <input
                  type="text"
                  value={profile.address}
                  onChange={(event) =>
                    handleProfileChange("address", event.target.value)
                  }
                />
              </ProfileField>

              <div className="profile-actions">
                <button
                  type="button"
                  className="profile-btn profile-btn--primary"
                  onClick={handleSaveProfile}
                  disabled={updateProfile.isPending}
                >
                  {updateProfile.isPending ? "Αποθήκευση..." : "Αποθήκευση"}
                </button>
              </div>
            </div>
          </section>

          <section className="profile-card">
            <div className="profile-card__header">
              <div>
                <h3>Αλλαγή κωδικού</h3>
                <p>Ορίστε νέο κωδικό πρόσβασης για τον λογαριασμό σας.</p>
              </div>
            </div>

            <div className="profile-form">
              <ProfileField label="Τρέχων κωδικός">
                <input
                  type="password"
                  value={passwords.currentPassword}
                  onChange={(event) =>
                    handlePasswordChange("currentPassword", event.target.value)
                  }
                />
              </ProfileField>

              <ProfileField label="Νέος κωδικός">
                <input
                  type="password"
                  value={passwords.newPassword}
                  onChange={(event) =>
                    handlePasswordChange("newPassword", event.target.value)
                  }
                />
              </ProfileField>

              <ProfileField label="Επιβεβαίωση νέου κωδικού">
                <input
                  type="password"
                  value={passwords.confirmPassword}
                  onChange={(event) =>
                    handlePasswordChange("confirmPassword", event.target.value)
                  }
                />
              </ProfileField>

              <div className="profile-actions">
                <button
                  type="button"
                  className="profile-btn profile-btn--secondary"
                  onClick={handleChangePassword}
                >
                  Αλλαγή κωδικού
                </button>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}

function ProfileField({
  label,
  children,
}: {
  label: string;
  children: ReactNode;
}) {
  return (
    <label className="profile-field">
      <span>{label}</span>
      {children}
    </label>
  );
}