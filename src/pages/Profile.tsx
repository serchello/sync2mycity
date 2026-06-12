import { useEffect, useState } from "react";
import type { ReactNode } from "react";
import HeaderTitle from "../ui/HeaderTitle";
import "../styles/Profile.css";
import { useCurrentUser } from "../hooks/useCurrentUser";
import { useUpdateProfile } from "../hooks/useProfile";

interface ProfileForm {
  first_name: string;
  last_name: string;
  mail: string;
  phone: string;
  address: string;
}

const EMPTY_PROFILE: ProfileForm = {
  first_name: "",
  last_name: "",
  mail: "",
  phone: "",
  address: "",
};

export default function Profile() {
  const { data: user, isLoading, error } = useCurrentUser();
  const updateProfile = useUpdateProfile();

  const [profile, setProfile] = useState<ProfileForm>(EMPTY_PROFILE);
  const [initialProfile, setInitialProfile] = useState<ProfileForm>(EMPTY_PROFILE);

  const [isEditing, setIsEditing] = useState(false);
  const [saved, setSaved] = useState(false);

  const [passwords, setPasswords] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  useEffect(() => {
    if (!user) return;

    const nextProfile: ProfileForm = {
      first_name: user.first_name || "",
      last_name: user.last_name || "",
      mail: user.mail || "",
      phone: String(user.phone || ""),
      address: user.address || "",
    };

    setProfile(nextProfile);
    setInitialProfile(nextProfile);
  }, [user]);

  const handleProfileChange = (field: keyof ProfileForm, value: string) => {
    setProfile((prev) => ({
      ...prev,
      [field]: value,
    }));

    setSaved(false);
  };

  const handleEdit = () => {
    setIsEditing(true);
    setSaved(false);
  };

  const handleCancel = () => {
    setProfile(initialProfile);
    setIsEditing(false);
    setSaved(false);
  };

  const handleSaveProfile = () => {
    if (!user) return;

    updateProfile.mutate(
      {
        uid: user.uid,
        first_name: profile.first_name,
        last_name: profile.last_name,
        mail: profile.mail,
        phone: profile.phone,
        address: profile.address,
      },
      {
        onSuccess: () => {
          setInitialProfile(profile);
          setIsEditing(false);
          setSaved(true);
        },
        onError: () => {
          alert("Δεν ήταν δυνατή η αποθήκευση των στοιχείων");
        },
      }
    );
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

  if (!user) {
    return (
      <div className="main-content">
        <div className="profile-page">
          <HeaderTitle title="Προφίλ Χρήστη" type="profile" />
          <div className="profile-card">
            Δεν βρέθηκαν στοιχεία χρήστη.
          </div>
        </div>
      </div>
    );
  }

  const fullName =
    `${profile.first_name || ""} ${profile.last_name || ""}`.trim() ||
    user.name ||
    "Χρήστης";

  
  console.log("User data:", user);
  
  
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

              <div className="profile-header-actions">
                {saved && <span className="profile-saved">Αποθηκεύτηκε</span>}

                {!isEditing && (
                  <button
                    type="button"
                    className="profile-btn profile-btn--secondary"
                    onClick={handleEdit}
                  >
                    Επεξεργασία
                  </button>
                )}
              </div>
            </div>

            <div className="profile-avatar-block">
              {user.user_picture ? (
                <img
                  src={user.user_picture}
                  alt={fullName}
                  className="profile-avatar profile-avatar--image"
                />
              ) : (
                <div className="profile-avatar">
                  {profile.first_name.charAt(0) || "?"}
                  {profile.last_name.charAt(0)}
                </div>
              )}

              <div>
                <p className="profile-avatar-name">{fullName}</p>
                <p className="profile-avatar-email">{profile.mail}</p>
                <p className="profile-avatar-meta">UID: {user.uid}</p>
              </div>
            </div>

            <div className="profile-form">
              <div className="profile-row">
                <ProfileField label="Όνομα">
                  <input
                    type="text"
                    value={profile.first_name}
                    disabled={!isEditing}
                    onChange={(event) =>
                      handleProfileChange("first_name", event.target.value)
                    }
                  />
                </ProfileField>

                <ProfileField label="Επώνυμο">
                  <input
                    type="text"
                    value={profile.last_name}
                    disabled={!isEditing}
                    onChange={(event) =>
                      handleProfileChange("last_name", event.target.value)
                    }
                  />
                </ProfileField>
              </div>

              <ProfileField label="Email">
                <input
                  type="email"
                  value={profile.mail}
                  disabled={!isEditing}
                  onChange={(event) =>
                    handleProfileChange("mail", event.target.value)
                  }
                />
              </ProfileField>

              <ProfileField label="Τηλέφωνο">
                <input
                  type="tel"
                  value={profile.phone}
                  disabled={!isEditing}
                  onChange={(event) =>
                    handleProfileChange("phone", event.target.value)
                  }
                />
              </ProfileField>

              <ProfileField label="Διεύθυνση">
                <input
                  type="text"
                  value={profile.address}
                  disabled={!isEditing}
                  onChange={(event) =>
                    handleProfileChange("address", event.target.value)
                  }
                />
              </ProfileField>

              <ProfileField label="Ρόλοι">
                <input
                  type="text"
                  value={user.roles_target_id || ""}
                  disabled
                />
              </ProfileField>

              {isEditing && (
                <div className="profile-actions">
                  <button
                    type="button"
                    className="profile-btn profile-btn--secondary"
                    onClick={handleCancel}
                    disabled={updateProfile.isPending}
                  >
                    Ακύρωση
                  </button>

                  <button
                    type="button"
                    className="profile-btn profile-btn--primary"
                    onClick={handleSaveProfile}
                    disabled={updateProfile.isPending}
                  >
                    {updateProfile.isPending
                      ? "Αποθήκευση..."
                      : "Αποθήκευση"}
                  </button>
                </div>
              )}
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