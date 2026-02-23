import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { toast } from "react-toastify";
import axios from "axios";

const styles = {
  container: {
    minHeight: "100vh",
    background: "linear-gradient(135deg, #3730a3 0%, #1e1b4b 100%)",
    padding: "3rem 1rem",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  wrapper: {
    position: "relative",
    maxWidth: "64rem",
    width: "100%",
    margin: "0 auto",
  },
  deco1: {
    position: "absolute",
    top: "2.5rem",
    right: "2.5rem",
    width: "6rem",
    height: "6rem",
    background: "#60a5fa",
    borderTopLeftRadius: "1.5rem",
    borderBottomRightRadius: "1.5rem",
    opacity: 0.6,
    display: "none",
    mdDisplay: "block",
  },
  deco2: {
    position: "absolute",
    bottom: "2.5rem",
    left: "2.5rem",
    width: "6rem",
    height: "6rem",
    background: "#93c5fd",
    borderRadius: "9999px",
    opacity: 0.6,
    display: "none",
    mdDisplay: "block",
  },
  deco3: {
    position: "absolute",
    bottom: "-1.25rem",
    right: "8rem",
    width: "4rem",
    height: "4rem",
    background: "#6366f1",
    transform: "rotate(45deg)",
    opacity: 0.6,
    display: "none",
    mdDisplay: "block",
  },
  card: {
    background: "rgba(255,255,255,0.1)",
    backdropFilter: "blur(16px)",
    borderRadius: "1.5rem",
    overflow: "hidden",
    boxShadow: "0 10px 32px 0 rgba(31, 41, 55, 0.35)",
    border: "1px solid rgba(255,255,255,0.2)",
  },
  flexRow: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
  },
  left: {
    flex: "1 1 33%",
    background: "linear-gradient(135deg, #4338ca 0%, #1e1b4b 100%)",
    padding: "2rem",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  right: {
    flex: "1 1 67%",
    padding: "2rem",
  },
  avatarWrapper: {
    position: "relative",
    marginBottom: "1.5rem",
    group: true,
  },
  avatarImg: {
    width: "10rem",
    height: "10rem",
    borderRadius: "9999px",
    objectFit: "cover",
    border: "4px solid #93c5fd",
    boxShadow: "0 4px 24px 0 rgba(31, 41, 55, 0.15)",
    transition: "transform 0.3s",
  },
  avatarSvg: {
    width: "10rem",
    height: "10rem",
    borderRadius: "9999px",
    background: "#bfdbfe",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "#3730a3",
    fontSize: "2.25rem",
    border: "4px solid #93c5fd",
    boxShadow: "0 4px 24px 0 rgba(31, 41, 55, 0.15)",
  },
  uploadBtnWrapper: {
    position: "absolute",
    bottom: "-0.5rem",
    right: "-0.5rem",
  },
  uploadBtn: {
    cursor: "pointer",
    background: "#3b82f6",
    color: "#fff",
    borderRadius: "9999px",
    padding: "0.5rem",
    boxShadow: "0 2px 8px 0 rgba(59,130,246,0.15)",
    border: "none",
    transition: "background 0.3s",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  userName: {
    fontSize: "1.5rem",
    fontWeight: "bold",
    color: "#fff",
    marginBottom: "0.5rem",
    textAlign: "center",
  },
  userContact: {
    display: "flex",
    alignItems: "center",
    color: "#bfdbfe",
    marginBottom: "1.5rem",
    fontSize: "1rem",
    gap: "0.5rem",
    justifyContent: "center",
  },
  previewWrapper: {
    marginTop: "1rem",
    textAlign: "center",
  },
  previewLabel: {
    color: "#bfdbfe",
    fontSize: "0.875rem",
    marginBottom: "0.5rem",
    display: "block",
  },
  previewImg: {
    width: "5rem",
    height: "5rem",
    borderRadius: "9999px",
    objectFit: "cover",
    border: "2px solid #60a5fa",
    margin: "0 auto",
  },
  saveBtn: {
    marginTop: "1rem",
    padding: "0.5rem 1.5rem",
    borderRadius: "9999px",
    fontWeight: "500",
    fontSize: "0.875rem",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    border: "none",
    background: "#3b82f6",
    color: "#fff",
    transition: "background 0.3s, box-shadow 0.3s",
    cursor: "pointer",
  },
  saveBtnDisabled: {
    background: "#a5b4fc",
    cursor: "not-allowed",
  },
  successMsg: {
    marginTop: "0.5rem",
    color: "#6ee7b7",
    fontSize: "0.875rem",
    display: "flex",
    alignItems: "center",
    gap: "0.25rem",
  },
  errorMsg: {
    marginTop: "0.5rem",
    color: "#fca5a5",
    fontSize: "0.875rem",
  },
  sectionTitle: {
    fontSize: "2rem",
    fontWeight: "bold",
    color: "#fff",
  },
  badge: {
    fontSize: "0.75rem",
    background: "#3b82f6",
    color: "#fff",
    padding: "0.25rem 0.75rem",
    borderRadius: "9999px",
    textTransform: "uppercase",
    fontWeight: "600",
    letterSpacing: "0.1em",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "1.5rem",
  },
  gridFull: {
    gridColumn: "span 2",
  },
  infoCard: {
    background: "rgba(255,255,255,0.1)",
    borderRadius: "0.75rem",
    padding: "1rem",
  },
  infoTitle: {
    color: "#bfdbfe",
    fontSize: "0.875rem",
    fontWeight: "600",
    textTransform: "uppercase",
    letterSpacing: "0.05em",
    marginBottom: "0.5rem",
  },
  infoLabel: {
    color: "#bfdbfe",
    fontSize: "0.75rem",
    marginBottom: "0.25rem",
    display: "block",
  },
  infoValue: {
    color: "#fff",
    fontWeight: "500",
    fontSize: "1rem",
  },
  usageStat: {
    background: "rgba(67,56,202,0.5)",
    borderRadius: "0.5rem",
    padding: "0.75rem",
    textAlign: "center",
  },
  usageNum: {
    fontSize: "2rem",
    fontWeight: "bold",
    color: "#fff",
  },
  usageLabel: {
    fontSize: "0.75rem",
    color: "#bfdbfe",
  },
  actions: {
    marginTop: "2rem",
    display: "flex",
    justifyContent: "flex-end",
    gap: "0.75rem",
  },
  editBtn: {
    padding: "0.5rem 1rem",
    background: "transparent",
    border: "1px solid #93c5fd",
    color: "#93c5fd",
    borderRadius: "9999px",
    fontSize: "0.875rem",
    fontWeight: "500",
    cursor: "pointer",
    transition: "background 0.3s",
  },
  editBtnHover: {
    background: "rgba(30, 64, 175, 0.2)",
  },
  dashBtn: {
    padding: "0.5rem 1rem",
    background: "#3b82f6",
    color: "#fff",
    borderRadius: "9999px",
    fontSize: "0.875rem",
    fontWeight: "500",
    border: "none",
    cursor: "pointer",
    transition: "background 0.3s",
  },
  dashBtnHover: {
    background: "#2563eb",
  },
  footer: {
    background: "rgba(30,27,75,0.5)",
    padding: "1rem 2rem",
    textAlign: "center",
  },
  footerText: {
    color: "#bfdbfe",
    fontSize: "0.875rem",
    margin: 0,
  },

  // Login card styles
  loginBg: {
    minHeight: "100vh",
    background: "linear-gradient(to bottom, #3730a3, #1e1b4b)",
    color: "#fff",
    padding: "1.5rem",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  loginCard: {
    background: "rgba(67,56,202,0.3)",
    backdropFilter: "blur(8px)",
    padding: "2rem",
    borderRadius: "1rem",
    maxWidth: "24rem",
    width: "100%",
    textAlign: "center",
    boxShadow: "0 10px 32px 0 rgba(31, 41, 55, 0.25)",
  },
  loginHeader: {
    display: "flex",
    justifyContent: "center",
    marginBottom: "1.5rem",
    gap: "0.5rem",
  },
  loginShape1: {
    width: "4rem",
    height: "4rem",
    background: "#60a5fa",
    borderTopLeftRadius: "1.5rem",
    borderBottomRightRadius: "1.5rem",
  },
  loginShape2: {
    width: "4rem",
    height: "4rem",
    background: "#93c5fd",
    borderRadius: "9999px",
    marginLeft: "0.5rem",
  },
  loginText: {
    fontSize: "1.25rem",
    fontWeight: "300",
  },
  loginBtn: {
    marginTop: "1.5rem",
    background: "#3b82f6",
    color: "#fff",
    fontWeight: "500",
    padding: "0.5rem 1.5rem",
    borderRadius: "9999px",
    border: "none",
    transition: "background 0.3s",
    cursor: "pointer",
    boxShadow: "0 4px 16px 0 rgba(59,130,246,0.15)",
  },
};

const Profile = () => {
  const { user, setUser } = useContext(AuthContext);
  const [selectedFile, setSelectedFile] = useState(null);
  const [preview, setPreview] = useState("");
  const [uploading, setUploading] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const [uploadError, setUploadError] = useState(null);

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
    setUploadSuccess(false);
    setUploadError(null);
  };

  useEffect(() => {
    if (selectedFile) {
      const objectUrl = URL.createObjectURL(selectedFile);
      setPreview(objectUrl);
      return () => URL.revokeObjectURL(objectUrl);
    }
  }, [selectedFile]);

  const handleUpload = async () => {
    if (!selectedFile) {
      toast.error("No file selected");
      setUploadError("No file selected");
      return;
    }

    setUploading(true);
    setUploadSuccess(false);
    setUploadError(null);
    const formData = new FormData();
    formData.append("profilePic", selectedFile);

    try {
      const res = await axios.post(
        "http://localhost:5000/api/auth/update-profile-pic",
        formData,
        {
          withCredentials: true,
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      setUser(res.data);
      toast.success("Profile picture updated!");
      setSelectedFile(null);
      setPreview("");
      setUploadSuccess(true);
    } catch (error) {
      toast.error("Failed to upload profile picture");
      setUploadError("Failed to upload. Please try again.");
    } finally {
      setUploading(false);
    }
  };

  if (!user) {
    return (
      <div style={styles.loginBg}>
        <div style={styles.loginCard}>
          <div style={styles.loginHeader}>
            <div style={styles.loginShape1}></div>
            <div style={styles.loginShape2}></div>
          </div>
          <p style={styles.loginText}>Please log in to view your profile</p>
          <button style={styles.loginBtn}>
            Login
          </button>
        </div>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      <div style={styles.wrapper}>
        {/* Decorative Elements (hidden on small screens) */}
        <div style={{...styles.deco1, display: "none"}} className="deco-md"></div>
        <div style={{...styles.deco2, display: "none"}} className="deco-md"></div>
        <div style={{...styles.deco3, display: "none"}} className="deco-md"></div>
        <div style={styles.card}>
          <div style={styles.flexRow}>
            {/* Left Section - User Avatar */}
            <div style={styles.left}>
              <div style={styles.avatarWrapper}>
                {user?.profilePic || preview ? (
                  <img
                    src={preview || user.profilePic}
                    alt="Profile"
                    style={styles.avatarImg}
                  />
                ) : (
                  <div style={styles.avatarSvg}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      style={{width: "4rem", height: "4rem"}}
                    >
                      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                      <circle cx="12" cy="7" r="4"></circle>
                    </svg>
                  </div>
                )}

                <div style={styles.uploadBtnWrapper}>
                  <label htmlFor="profile-upload" style={styles.uploadBtn}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      style={{width: "1.25rem", height: "1.25rem"}}
                    >
                      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                      <polyline points="17 8 12 3 7 8"></polyline>
                      <line x1="12" y1="3" x2="12" y2="15"></line>
                    </svg>
                    <input
                      id="profile-upload"
                      type="file"
                      accept="image/*"
                      onChange={handleFileChange}
                      style={{display: "none"}}
                    />
                  </label>
                </div>
              </div>
              <h2 style={styles.userName}>{user?.username || "User"}</h2>
              <div style={styles.userContact}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  style={{width: "1rem", height: "1rem"}}
                >
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                  <polyline points="22,6 12,13 2,6"></polyline>
                </svg>
                <span style={{fontSize: "0.875rem"}}>{user?.email}</span>
              </div>
              {preview && (
                <div style={styles.previewWrapper}>
                  <span style={styles.previewLabel}>New Photo Preview</span>
                  <img
                    src={preview}
                    alt="Preview"
                    style={styles.previewImg}
                  />
                </div>
              )}
              {selectedFile && (
                <button
                  onClick={handleUpload}
                  disabled={uploading}
                  style={{
                    ...styles.saveBtn,
                    ...(uploading ? styles.saveBtnDisabled : {}),
                  }}
                >
                  {uploading ? (
                    <>
                      <svg style={{
                        animation: "spin 1s linear infinite",
                        marginLeft: "-0.25rem",
                        marginRight: "0.5rem",
                        height: "1rem",
                        width: "1rem",
                        color: "#fff"
                      }} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Uploading...
                    </>
                  ) : (
                    "Save Photo"
                  )}
                </button>
              )}
              {uploadError && (
                <p style={styles.errorMsg}>{uploadError}</p>
              )}
              {uploadSuccess && (
                <p style={styles.successMsg}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    style={{width: "1rem", height: "1rem"}}
                  >
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                    <polyline points="22 4 12 14.01 9 11.01"></polyline>
                  </svg>
                  Photo updated successfully!
                </p>
              )}
            </div>
            {/* Right Section - User Details */}
            <div style={styles.right}>
              <div style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                marginBottom: "2rem"
              }}>
                <h1 style={styles.sectionTitle}>My Profile</h1>
                <div style={styles.badge}>
                  Silent Bridge Member
                </div>
              </div>
              <div style={styles.grid}>
                <div style={styles.infoCard}>
                  <h3 style={styles.infoTitle}>Account Info</h3>
                  <div style={{display: "flex", flexDirection: "column", gap: "1rem"}}>
                    <div>
                      <label style={styles.infoLabel}>Username</label>
                      <p style={styles.infoValue}>{user?.username || "Not set"}</p>
                    </div>
                    <div>
                      <label style={styles.infoLabel}>Email</label>
                      <p style={styles.infoValue}>{user?.email}</p>
                    </div>
                    <div>
                      <label style={styles.infoLabel}>Joined</label>
                      <p style={styles.infoValue}>May 2025</p>
                    </div>
                  </div>
                </div>
                <div style={styles.infoCard}>
                  <h3 style={styles.infoTitle}>Preferences</h3>
                  <div style={{display: "flex", flexDirection: "column", gap: "1rem"}}>
                    <div>
                      <label style={styles.infoLabel}>Language</label>
                      <p style={styles.infoValue}>English / Indian Sign Language</p>
                    </div>
                    {/* <div>
                      <label style={styles.infoLabel}>Dark Mode</label>
                      <div style={{marginTop: "0.25rem"}}>
                        <label style={{position: "relative", display: "inline-flex", alignItems: "center", cursor: "pointer"}}>
                          <input type="checkbox" value="" style={{display: "none"}} checked readOnly />
                          <div style={{
                            width: "2.75rem",
                            height: "1.5rem",
                            background: "#374151",
                            borderRadius: "9999px",
                            position: "relative",
                            marginRight: "0.75rem",
                          }}>
                            <div style={{
                              content: "''",
                              position: "absolute",
                              top: 2,
                              left: 2,
                              background: "#fff",
                              border: "1px solid #d1d5db",
                              borderRadius: "9999px",
                              height: "1.25rem",
                              width: "1.25rem",
                              transition: "all 0.2s",
                              transform: "translateX(1.25rem)",
                              backgroundColor: "#fff",
                              borderColor: "#fff"
                            }}></div>
                          </div>
                          <span style={{marginLeft: "0.75rem", fontSize: "0.875rem", color: "#fff"}}>Enabled</span>
                        </label>
                      </div>
                    </div> */}
                  </div>
                </div>
                <div style={{...styles.infoCard, ...styles.gridFull}}>
                  <h3 style={styles.infoTitle}>Usage Stats</h3>
                  <div style={{display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "1rem", textAlign: "center"}}>
                    <div style={styles.usageStat}>
                      <span style={styles.usageNum}>12</span>
                      <span style={styles.usageLabel}>Translations</span>
                    </div>
                    <div style={styles.usageStat}>
                      <span style={styles.usageNum}>5</span>
                      <span style={styles.usageLabel}>Lessons</span>
                    </div>
                    <div style={styles.usageStat}>
                      <span style={styles.usageNum}>3</span>
                      <span style={styles.usageLabel}>Conversations</span>
                    </div>
                  </div>
                </div>
              </div>
              <div style={styles.actions}>
                {/* <button style={styles.editBtn}>Edit Profile</button> */}
                <button style={styles.dashBtn}>Dashboard</button>
              </div>
            </div>
          </div>
          <div style={styles.footer}>
            <p style={styles.footerText}>POWERED BY AI • Silent Bridge © 2025</p>
          </div>
        </div>
      </div>
      {/* Inline style for spinner animation */}
      <style>
        {`
          @media (min-width: 768px) {
            .deco-md { display: block !important; }
          }
          @keyframes spin {
            to { transform: rotate(360deg); }
          }
        `}
      </style>
    </div>
  );
};

export default Profile;