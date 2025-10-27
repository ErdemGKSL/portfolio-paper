import React from "react";

const Section = ({ title, children }: { title: string; children: React.ReactNode }) => (
    <div style={{ marginBottom: "38px", display: "flex", flexDirection: "column" }}>
        <div style={{ display: "flex", alignItems: "center", marginBottom: "22px" }}>
            <h2 style={{
                fontSize: "62px",
                fontWeight: "700",
                color: "#1a202c",
                fontFamily: "Oswald",
                margin: "0",
                textTransform: "uppercase",
                letterSpacing: "2px",
            }}>
                {title}
            </h2>
            <div style={{ flex: 1, height: "5px", backgroundColor: "#e2e8f0", marginLeft: "45px" }} />
        </div>
        {children}
    </div>
);

const ExperienceCard = ({ 
    title, 
    type, 
    description,
    color,
    from,
    to,
    ...otherProps
}: { 
    title: string; 
    type: string; 
    description: string;
    color: string;
    from?: string;
    to?: string;
    [key: string]: any;
}) => (
    <div 
        style={{
            marginBottom: "22px",
            backgroundColor: "#f7fafc",
            padding: "30px",
            borderRadius: "22px",
            borderLeft: `11px solid ${color}`,
            display: "flex",
            flexDirection: "column",
        }}
        {...otherProps}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "15px" }}>
            <div style={{ display: "flex", flexDirection: "column" }}>
                <h3 style={{
                    fontSize: "54px",
                    fontWeight: "700",
                    color: "#2d3748",
                    margin: "0",
                    fontFamily: "Oswald",
                }}>
                    {title}
                </h3>
                {(from || to) && (
                    <span style={{
                        fontSize: "38px",
                        color: "#718096",
                        marginTop: "8px",
                        fontWeight: "500",
                    }}>
                        {from} {to && `- ${to}`}
                    </span>
                )}
            </div>
            <span style={{
                fontSize: "40px",
                color: "#718096",
                backgroundColor: "#e2e8f0",
                padding: "11px 30px",
                borderRadius: "15px",
                fontWeight: "600",
            }}>
                {type}
            </span>
        </div>
        <p style={{
            fontSize: "42px",
            lineHeight: "1.55",
            color: "#4a5568",
            margin: "0",
        }}>
            {description}
        </p>
    </div>
);

export default function Extra() {
    return (
        <div
            style={{
                display: "flex",
                flexDirection: "column",
                width: "100%",
                height: "100%",
                backgroundColor: "#ffffff",
                padding: "115px 150px",
                fontFamily: "Roboto",
            }}
        >
            {/* Header */}
            <div style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: "55px",
                paddingBottom: "42px",
                borderBottom: "7px solid #2d3748",
            }}>
                <h1 
                    data-role="section-heading"
                    style={{
                        fontSize: "135px",
                        fontWeight: "900",
                        margin: "0",
                        color: "#1a202c",
                        fontFamily: "Oswald",
                        letterSpacing: "5px",
                    }}>
                    DENEYIMLER
                </h1>
                <div 
                    data-role="name"
                    style={{
                        fontSize: "62px",
                        color: "#4a5568",
                        fontWeight: "700",
                    }}>
                    Erdem Göksel
                </div>
            </div>

            <Section title="Profesyonel Deneyim">
                <ExperienceCard
                    title="BirCloud"
                    type="Şirket"
                    color="#3182ce"
                    from="07.2025"
                    to="08.2025"
                    description="Bulut teknolojileri alanında faaliyet gösteren bir firmanın frontend geliştirme süreçlerine katkıda bulundum. 1 aylık staj sürecinde modern web teknolojileri ile çalışma fırsatı buldum."
                    data-role="experience-section"
                />

                <ExperienceCard
                    title="Maltepe Üniversitesi Asistanlık"
                    type="Üniversite"
                    color="#3182ce"
                    from="03.2022"
                    to="06.2025"
                    description="Öğrenci asistanı olarak, ders materyallerinin hazırlanmasında ve öğrencilere destek sağlanmasında görev aldım. Yaklaşık 2.5 yıl süren bu deneyimin, 1 yılı resmi asistanlık statüsünde olurken 1.5 senesi ise gönüllü asistanlıktı. Prof. Dr. Ensar Gül'ün liderliğinde çalıştım."
                    data-role="experience-section"
                />
                
                <ExperienceCard
                    title="Gazete Keyfi"
                    type="Şirket"
                    color="#3182ce"
                    from="09.2025"
                    to="10.2025"
                    description="Platformun SEO performansını optimize ettim ve özel koşullar için dinamik sayfa yapıları geliştirdim. Ayrıca, DDoS saldırılarına karşı güvenlik önlemi olarak ülke bazlı filtreleme yapabilen Rust tabanlı bir proxy sunucusu tasarlayıp hayata geçirdim."
                    data-role="experience-section"
                />
            </Section>

            <Section title="Açık Kaynak Projeler">
                <ExperienceCard
                    title="phantom-frame"
                    type="Açık Kaynak"
                    color="#48bb78"
                    description="Sıfırdan geliştirdiğim Rust tabanlı bir kütüphane. Frontend sunucuları için tasarlanmış bir proxy çözümü sunarak, backend ve frontend'in aynı port üzerinden çalışmasını sağlıyor. Performans optimizasyonu için sayfa render işlemlerini önbelleğe alıp hızlı bir şekilde sunuyor."
                    data-role="experience-section"
                />
            </Section>

            <Section title="Kişisel Projeler">
                <ExperienceCard
                    title="MangaWind"
                    type="Kapalı Kaynak"
                    color="#9f7aea"
                    description="Freelance olarak geliştirdiğim fullstack bir çizgi-roman platformu. Backend tarafında Rust, frontend tarafında SvelteKit teknolojilerini kullanarak modern ve performanslı bir uygulama oluşturdum."
                    data-role="experience-section"
                />
            </Section>

            {/* Footer Note */}
            <div 
                data-role="content"
                style={{
                    marginTop: "auto",
                    padding: "30px",
                    backgroundColor: "#edf2f7",
                    borderRadius: "22px",
                    borderLeft: "11px solid #f59e0b",
                    display: "flex",
                    flexDirection: "column",
                }}>
                <p style={{
                    fontSize: "42px",
                    lineHeight: "1.55",
                    color: "#4a5568",
                    margin: "0",
                }}>
                    Geçmişimde bunlardan çok daha fazla proje bulunmakta. Her projemde kendimi geliştirdiğim için burada sadece öne çıkanları paylaştım. GitHub profilimden açık kaynak diğer projelerime ulaşabilirsiniz.
                </p>
            </div>

            {/* Page Footer */}
            <div style={{
                marginTop: "30px",
                paddingTop: "30px",
                borderTop: "5px solid #e2e8f0",
                textAlign: "center",
                fontSize: "40px",
                color: "#a0aec0",
            }}>
                Sayfa 2 • 2025
            </div>
        </div>
    );
}
