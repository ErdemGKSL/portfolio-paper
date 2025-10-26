import React from "react";

const SkillBar = ({ skill, percentage, color }: { skill: string; percentage: number; color: string }) => (
    <div style={{ marginBottom: "30px", display: "flex", flexDirection: "column" }}>
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "15px" }}>
            <span style={{ fontSize: "50px", fontWeight: "600", color: "#2d3748" }}>{skill}</span>
            <span style={{ fontSize: "46px", color: "#718096", fontWeight: "600" }}>{percentage}%</span>
        </div>
        <div style={{ width: "100%", height: "25px", backgroundColor: "#e2e8f0", borderRadius: "12px", overflow: "hidden", display: "flex" }}>
            <div style={{ width: `${percentage}%`, height: "100%", backgroundColor: color, borderRadius: "12px" }} />
        </div>
    </div>
);

const Section = ({ title, children }: { title: string; children: React.ReactNode }) => (
    <div style={{ marginBottom: "50px", display: "flex", flexDirection: "column" }}>
        <div style={{ display: "flex", alignItems: "center", marginBottom: "35px" }}>
            <h2 style={{
                fontSize: "67px",
                fontWeight: "700",
                color: "#1a202c",
                fontFamily: "Oswald",
                margin: "0",
                textTransform: "uppercase",
                letterSpacing: "2px",
            }}>
                {title}
            </h2>
            <div style={{ flex: 1, height: "6px", backgroundColor: "#e2e8f0", marginLeft: "50px" }} />
        </div>
        {children}
    </div>
);

export default function Home() {
    return (
        <div
            style={{
                display: "flex",
                flexDirection: "column",
                width: "100%",
                height: "100%",
                backgroundColor: "#ffffff",
                padding: "133px 167px",
                fontFamily: "Roboto",
            }}
        >
            {/* Header */}
            <div style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "flex-start",
                marginBottom: "60px",
                paddingBottom: "40px",
                borderBottom: "8px solid #2d3748",
            }}>
                <div style={{ display: "flex", gap: "67px", alignItems: "center" }}>
                    {/* Profile Photo */}
                    <img 
                        src="/me.jpg" 
                        alt="Erdem Göksel"
                        style={{
                            width: "250px",
                            height: "250px",
                            borderRadius: "50%",
                            objectFit: "cover",
                            border: "8px solid #2d3748",
                        }}
                    />
                    
                    <div style={{ display: "flex", flexDirection: "column" }}>
                        <h1 style={{
                            fontSize: "150px",
                            fontWeight: "900",
                            margin: "0 0 17px 0",
                            color: "#1a202c",
                            fontFamily: "Oswald",
                            letterSpacing: "6px",
                        }}>
                            ERDEM GÖKSEL
                        </h1>
                        <p style={{
                            fontSize: "67px",
                            color: "#4a5568",
                            margin: "0",
                            fontWeight: "500",
                        }}>
                            Fullstack Geliştirici
                        </p>
                    </div>
                </div>
                <div style={{ textAlign: "right", marginTop: "17px", display: "flex", flexDirection: "column" }}>
                    <div style={{ fontSize: "50px", color: "#718096", marginBottom: "12px", display: "flex", gap: "17px", justifyContent: "flex-end" }}>
                        <span style={{ color: "#2d3748", fontWeight: "700" }}>Kıdemli</span>
                        <span>TypeScript Geliştirici</span>
                    </div>
                    <div style={{ fontSize: "50px", color: "#718096", marginBottom: "12px", display: "flex", gap: "17px", justifyContent: "flex-end" }}>
                        <span style={{ color: "#2d3748", fontWeight: "700" }}>Orta Seviye</span>
                        <span>Rust Geliştirici</span>
                    </div>
                    <div style={{ fontSize: "46px", color: "#a0aec0", marginTop: "33px" }}>
                        50+ Tamamlanmış Proje
                    </div>
                </div>
            </div>

            {/* Ana Bilgiler Section */}
            <div style={{
                marginBottom: "25px",
                backgroundColor: "#f7fafc",
                padding: "20px 25px",
                borderRadius: "25px",
                border: "4px solid #3182ce",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
            }}>
                <div style={{ 
                    display: "flex", 
                    justifyContent: "center",
                    width: "100%",
                    marginBottom: "25px",
                }}>
                    <h2 style={{
                        fontSize: "58px",
                        fontWeight: "700",
                        color: "#1a202c",
                        fontFamily: "Oswald",
                        margin: "0",
                        textTransform: "uppercase",
                        letterSpacing: "2px",
                        textDecoration: "underline",
                    }}>
                        ANA BİLGİLER
                    </h2>
                </div>
                <div style={{ display: "flex", gap: "50px", justifyContent: "space-around", width: "100%" }}>
                    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", flex: 1 }}>
                        <span style={{ fontSize: "46px", fontWeight: "700", color: "#3182ce", marginBottom: "8px" }}>
                            Yaş
                        </span>
                        <span style={{ fontSize: "54px", fontWeight: "700", color: "#2d3748" }}>
                            21
                        </span>
                    </div>
                    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", flex: 1 }}>
                        <span style={{ fontSize: "46px", fontWeight: "700", color: "#3182ce", marginBottom: "8px" }}>
                            Ünvan
                        </span>
                        <span style={{ fontSize: "54px", fontWeight: "700", color: "#2d3748", textAlign: "center" }}>
                            Yazılım Mühendisi
                        </span>
                    </div>
                    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", flex: 1 }}>
                        <span style={{ fontSize: "46px", fontWeight: "700", color: "#3182ce", marginBottom: "8px" }}>
                            Uzmanlık Alanı
                        </span>
                        <span style={{ fontSize: "54px", fontWeight: "700", color: "#2d3748", textAlign: "center" }}>
                            Backend
                        </span>
                    </div>
                </div>
                <div style={{ display: "flex", gap: "50px", justifyContent: "space-around", width: "100%", marginTop: "25px" }}>
                    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", flex: 1 }}>
                        <span style={{ fontSize: "46px", fontWeight: "700", color: "#3182ce", marginBottom: "8px" }}>
                            E-posta
                        </span>
                        <span style={{ fontSize: "42px", fontWeight: "600", color: "#2d3748" }}>
                            erdem.goksel.dev@gmail.com
                        </span>
                    </div>
                    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", flex: 1 }}>
                        <span style={{ fontSize: "46px", fontWeight: "700", color: "#3182ce", marginBottom: "8px" }}>
                            Telefon
                        </span>
                        <span style={{ fontSize: "42px", fontWeight: "600", color: "#2d3748" }}>
                            +90 532 595 5586
                        </span>
                    </div>
                </div>
            </div>

            <div style={{ display: "flex", gap: "100px" }}>
                {/* Left Column */}
                <div style={{ flex: "1", display: "flex", flexDirection: "column" }}>
                    {/* Skills Section */}
                    <Section title="Yetenekler">
                        <SkillBar skill="Web Geliştirme" percentage={99} color="#3178c6" />
                        <SkillBar skill="Sunucu Geliştirme" percentage={95} color="#38a169" />
                        <SkillBar skill="Mobil Programlama" percentage={65} color="#fbbf24" />
                        <SkillBar skill="Masaüstü Uygulama Geliştirme" percentage={80} color="#e53e3e" />
                    </Section>

                    {/* Foreign Languages Section */}
                    <Section title="Yabancı Diller">
                        <SkillBar skill="İngilizce" percentage={90} color="#3182ce" />
                        <SkillBar skill="Japonca" percentage={20} color="#38a169" />
                    </Section>

                    {/* Education Section */}
                    <Section title="Eğitim">
                        <div style={{
                            backgroundColor: "#f7fafc",
                            padding: "50px",
                            borderRadius: "25px",
                            borderLeft: "12px solid #3182ce",
                            display: "flex",
                            flexDirection: "column",
                        }}>
                            <div style={{ fontSize: "54px", fontWeight: "700", color: "#2d3748", marginBottom: "17px" }}>
                                Yazılım Mühendisliği
                            </div>
                            <div style={{ fontSize: "50px", color: "#4a5568", marginBottom: "12px" }}>
                                Maltepe University
                            </div>
                            <div style={{ fontSize: "46px", color: "#718096", fontWeight: "600" }}>
                                2021 - 2025 • Mezun (Bütün dersler verildi, staj dahil, mezuniyet bekleniyor)
                            </div>
                        </div>
                    </Section>

                    {/* Links Section */}
                    <Section title="Bağlantılar">
                        <div style={{ display: "flex", flexDirection: "column", gap: "33px" }}>
                            <div style={{
                                display: "flex",
                                alignItems: "center",
                                padding: "33px 50px",
                                backgroundColor: "#f7fafc",
                                borderRadius: "17px",
                                borderLeft: "8px solid #0077b5",
                            }}>
                                <span style={{ fontSize: "46px", fontWeight: "700", color: "#0077b5", marginRight: "25px" }}>
                                    LinkedIn:
                                </span>
                                <span style={{ fontSize: "40px", color: "#4a5568" }}>
                                    linkedin.com/in/erdem-göksel-b04a8b202/
                                </span>
                            </div>
                            <div style={{
                                display: "flex",
                                flexDirection: "column",
                                padding: "33px 50px",
                                backgroundColor: "#f7fafc",
                                borderRadius: "17px",
                                borderLeft: "8px solid #333",
                            }}>
                                <div style={{ display: "flex", alignItems: "center", marginBottom: "17px" }}>
                                    <span style={{ fontSize: "46px", fontWeight: "700", color: "#333", marginRight: "25px" }}>
                                        GitHub:
                                    </span>
                                    <span style={{ fontSize: "40px", color: "#4a5568" }}>
                                        github.com/ErdemGKSL
                                    </span>
                                </div>
                                <div style={{ fontSize: "38px", color: "#718096", lineHeight: "1.5" }}>
                                    Çok yüksek aktivite, çok sayıda açık kaynak projesi. Zen Browser'a da katkıda bulundum.
                                </div>
                            </div>
                        </div>
                    </Section>
                </div>

                {/* Right Column */}
                <div style={{ flex: "1", display: "flex", flexDirection: "column" }}>
                    {/* About Me Section */}
                    <Section title="Hakkımda">
                        <div style={{
                            backgroundColor: "#f7fafc",
                            padding: "50px",
                            borderRadius: "25px",
                            fontSize: "44px",
                            lineHeight: "1.6",
                            color: "#4a5568",
                            display: "flex",
                            flexDirection: "column",
                        }}>
                            <p style={{ margin: "0 0 33px 0" }}>
                                TypeScript ve Node.js ekosistemleri konusunda kapsamlı deneyime sahip, tutkulu bir fullstack geliştiriciyim. 
                                Açık kaynak yazılım ve Linux tabanlı geliştirmeleri seviyorum, dolayısıyla sunuculara çok hakimim.
                            </p>
                            <p style={{ margin: "0" }}>
                                Şu anda sistem programlama ve yüksek performanslı uygulamalar geliştirmek için Rust'ı keşfediyorum. 
                                50'den fazla tamamlanmış projeyle, sağlam çözümler sunma konusunda pratik deneyim getiriyorum.
                            </p>
                        </div>
                    </Section>

                    {/* Programming Languages Section */}
                    <Section title="Yazılım Dilleri">
                        <SkillBar skill="Node.js & HTML & CSS" percentage={99} color="#3178c6" />
                        <SkillBar skill="Rust" percentage={60} color="#ce422b" />
                        <SkillBar skill="Kotlin & Java" percentage={30} color="#7f52ff" />
                    </Section>

                    {/* Additional Info */}
                    <Section title="Ek Bilgiler">
                        <div style={{ display: "flex", flexDirection: "column", gap: "25px" }}>
                            <div style={{
                                display: "flex",
                                alignItems: "center",
                                padding: "33px 50px",
                                backgroundColor: "#edf2f7",
                                borderRadius: "17px",
                            }}>
                                <div style={{
                                    width: "25px",
                                    height: "25px",
                                    backgroundColor: "#48bb78",
                                    borderRadius: "50%",
                                    marginRight: "33px",
                                }} />
                                <span style={{ fontSize: "46px", color: "#2d3748" }}>
                                    Askerlik: 2028'e kadar tecilli
                                </span>
                            </div>
                            <div style={{
                                display: "flex",
                                alignItems: "center",
                                padding: "33px 50px",
                                backgroundColor: "#edf2f7",
                                borderRadius: "17px",
                            }}>
                                <div style={{
                                    width: "25px",
                                    height: "25px",
                                    backgroundColor: "#ff8b32",
                                    borderRadius: "50%",
                                    marginRight: "33px",
                                }} />
                                <span style={{ fontSize: "46px", color: "#2d3748" }}>
                                    Ehliyet: Kurs aşamasında
                                </span>
                            </div>
                            <div style={{
                                display: "flex",
                                alignItems: "center",
                                padding: "33px 50px",
                                backgroundColor: "#edf2f7",
                                borderRadius: "17px",
                            }}>
                                <div style={{
                                    width: "25px",
                                    height: "25px",
                                    backgroundColor: "#4299e1",
                                    borderRadius: "50%",
                                    marginRight: "33px",
                                }} />
                                <span style={{ fontSize: "46px", color: "#2d3748" }}>
                                    Ana İşletim Sistemi: Arch Linux
                                </span>
                            </div>
                        </div>
                    </Section>
                </div>
            </div>

            {/* Footer */}
            <div style={{
                marginTop: "auto",
                paddingTop: "50px",
                borderTop: "6px solid #e2e8f0",
                textAlign: "center",
                fontSize: "42px",
                color: "#a0aec0",
            }}>
                Sayfa 1 • 2025
            </div>
        </div>
    );
}
