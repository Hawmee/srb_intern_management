import {
    Document,
    Image,
    Page,
    StyleSheet,
    Text,
    View,
} from "@react-pdf/renderer";
import mref from "./Logos/mef.jpg";
import rpbk from "./Logos/rpbm.jpg";

function AttestationPDF({
    attestation,
    reponse,
    evaluation,
    isAttestation,
    isReponse,
    isEvaluation,
}) {
    const styles = StyleSheet.create({
        page: {
            paddingHorizontal: 24,
            paddingVertical: 6,
            fontSize: 12,
            height: "100%",
            display: "flex",
            flexDirection: "column",
        },
        container: {
            width: "100%",
            height: "100%",
            alignSelf: "center",
        },
        topLogo: {
            width: 80,
            alignSelf: "center",
            marginBottom: 10,
        },
        ministrySection: {
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            marginBottom: 16,
        },
        ministryLogo: {
            width: 50,
            marginRight: 8,
        },
        ministryText: {
            fontSize: 8,
            lineHeight: 1.4,
            textAlign: "center",
        },
        title: {
            textAlign: "center",
            fontSize: 18,
            fontWeight: "bold",
            marginTop: 20,
            marginBottom: 12,
        },
        certificateNumber: {
            textAlign: "center",
            fontSize: 12,
            marginBottom: 20,
        },
        mainContent: {
            paddingHorizontal: 20,
            lineHeight: 1.5,
            textAlign: "justify",
        },
        boldText: {
            fontWeight: "bold",
        },
        signatureSection: {
            marginTop: 48,
            flexDirection: "row",
            justifyContent: "flex-end",
            fontSize: 12,
        },
        footer: {
            position: "absolute",
            bottom: 0,
            width: "100%",
            textAlign: "center",
            fontSize: 10,
            lineHeight: 1.3,
            marginBottom: 16, // Adds space above footer to separate it from main content
        },

        // Styles for the new FICHE-REPONSE page
        fichePage: {
            padding: 24,
            fontSize: 12,
            display: "flex",
            flexDirection: "column",
        },
        ficheTitle: {
            textAlign: "center",
            fontSize: 18,
            fontWeight: "bold",
            marginBottom: 16,
        },
        ficheContent: {
            fontSize: 12,
            lineHeight: 1.5,
        },
        ficheRow: {
            flexDirection: "row",
            marginBottom: 8,
        },
        ficheLabel: {
            width: "30%",
            fontWeight: "bold",
        },
        ficheValue: {
            width: "70%",
        },
        ficheSignature: {
            marginTop: 24,
            alignSelf: "flex-end",
        },
    });

    const SRB = {
        raison_social: "SRB VAK",
        siege: "ANTSIRABE",
        contact: "032 11 082 53",
        email: "srb.vakinankaratra@dgfag.mg",
    };

    return (
        <Document>
            {isAttestation && (
                <Page size="A4" style={styles.page}>
                    <View style={styles.container}>
                        {/* Top Logo */}
                        <Image src={rpbk} style={styles.topLogo} />

                        {/* Ministry Logo and Text (Left Side) */}
                        <View
                            style={{
                                flexDirection: "row",
                                justifyContent: "flex-start",
                            }}
                        >
                            <View
                                style={{
                                    flexDirection: "column",
                                    alignItems: "center",
                                }}
                            >
                                <Image src={mref} style={styles.ministryLogo} />
                                <View
                                    style={{
                                        flexDirection: "column",
                                        justifyContent: "center",
                                        alignItems: "center",
                                        marginTop: "1vh",
                                        fontSize: 10,
                                    }}
                                >
                                    <Text>MINISTERE DE L'ECONOMIE</Text>
                                    <Text>ET DES FINANCES</Text>
                                    <Text>SECRETARIAT GENERAL</Text>
                                    <Text>DIRECTION GENERAL DU BUDGET</Text>
                                    <Text>ET DES FINANCES</Text>
                                    <Text>DIRECTION DU BUDGET</Text>
                                    <Text>
                                        Service Régional du Budget
                                        Vakinankaratra
                                    </Text>
                                </View>
                            </View>
                        </View>

                        {/* Title and Number */}
                        <Text
                            style={{
                                ...styles.title,
                                marginTop: 54,
                                fontSize: 14,
                            }}
                        >
                            ATTESTATION DE STAGE
                        </Text>
                        <Text style={styles.certificateNumber}>
                            --- {attestation.numero} ---
                        </Text>

                        {/* Main Content */}
                        <View style={styles.mainContent}>
                            <Text>
                                Je sousigné RASOAMANANA Olivier Harison, Chef de
                                Service Régional du Budget à Vakinankaratra
                                atteste par la présente que:
                            </Text>
                            <Text style={{ marginTop: 12 }}>
                                <Text style={styles.boldText}>
                                    {attestation.stagiaire}
                                </Text>{" "}
                                a effectué un stage de{" "}
                                {attestation.lettre_duree} ({attestation.duree})
                                mois auprès de mon établissement dans le cadre
                                d'une initiation professionnelle.
                            </Text>
                            <Text style={{ marginTop: 12 }}>
                                Cette attestation lui est délivrée suite à la
                                demande de l'intéressé pour valoir ce que de
                                droit.
                            </Text>
                        </View>

                        {/* Signature Section */}
                        <View
                            style={{
                                ...styles.signatureSection,
                                marginRight: "6vh",
                            }}
                        >
                            <Text>Antsirabe le,____________</Text>
                        </View>

                        {/* Footer (Automatically placed at end of content) */}
                        <View style={{ ...styles.footer, fontSize: 8 }}>
                            <Text>Service Régional du Budget</Text>
                            <Text>
                                Villa JUHAL Tomboarivo Tél: 032 11 082 53
                            </Text>
                            <Text>Mail: srb.vakinankaratra@dgfag.mg</Text>
                        </View>
                    </View>
                </Page>
            )}

            {isReponse && (
                <Page
                    size="A4"
                    style={{
                        flexDirection: "column",
                        paddingVertical: "4vh",
                        paddingHorizontal: "4vh",
                    }}
                >
                    <View
                        style={{
                            flexDirection: "column",
                            alignItems: "center",
                        }}
                    >
                        <Text style={{ fontSize: "2vh" }}>FICHE-REPONSE</Text>
                    </View>
                    <View
                        style={{
                            flexDirection: "column",
                            alignItems: "flex-start",
                        }}
                    >
                        <View
                            style={{
                                flexDirection: "row",
                                justifyContent: "start",
                                fontSize: 14,
                                marginTop: 40,
                            }}
                        >
                            <Text style={{ borderBottom: "1px solid #000" }}>
                                RENSEIGNEMENTS SUR L'ENTREPRISE
                            </Text>
                        </View>
                        <Text style={{ fontSize: 14, marginTop: 12 }}>
                            Raison Social: {SRB.raison_social}
                        </Text>
                        <Text style={{ fontSize: 14, marginTop: 12 }}>
                            Siege: {SRB.siege}
                        </Text>
                        <Text style={{ fontSize: 14, marginTop: 12 }}>
                            Email: {SRB.email}
                        </Text>
                        <Text style={{ fontSize: 14, marginTop: 12 }}>
                            Contact: {SRB.contact}
                        </Text>

                        <View
                            style={{
                                flexDirection: "row",
                                justifyContent: "start",
                                fontSize: 14,
                                marginTop: 40,
                            }}
                        >
                            <Text style={{ borderBottom: "1px solid #000" }}>
                                RESPONSABLE DE LIAISON POUR LE STAGE
                            </Text>
                        </View>
                        <Text style={{ fontSize: 14, marginTop: 12 }}>
                            Nom et Prenoms: {reponse.encadreur.nom}
                        </Text>
                        <Text style={{ fontSize: 14, marginTop: 12 }}>
                            Fonction: {reponse.encadreur.fonction}
                        </Text>
                        <Text style={{ fontSize: 14, marginTop: 12 }}>
                            Departement/Service: {reponse.encadreur.serv}
                        </Text>

                        <View
                            style={{
                                flexDirection: "row",
                                justifyContent: "start",
                                fontSize: 14,
                                marginTop: 40,
                            }}
                        >
                            <Text style={{ borderBottom: "1px solid #000" }}>
                                STAGIAIRES A ACCEUILLIR
                            </Text>
                        </View>
                        <Text style={{ fontSize: 14, marginTop: 12 }}>
                            Mention : {reponse.stagiaire.mention}
                        </Text>
                        <Text style={{ fontSize: 14, marginTop: 12 }}>
                            Nombre: {reponse.stagiaire.nombre}
                        </Text>
                        <Text style={{ fontSize: 14, marginTop: 12 }}>
                            Periode de Stage: {reponse.stagiaire.periode}
                        </Text>
                    </View>
                    <View
                        style={{
                            flexDirection: "row",
                            justifyContent: "space-between",
                            marginTop: 160,
                        }}
                    >
                        <Text style={{ fontSize: 14 }}>
                            Signature du Responsable de liaison ,
                        </Text>
                        <Text style={{ fontSize: 14 }}>
                            Cachet de l'Entreprise ,
                        </Text>
                    </View>
                </Page>
            )}

            {isEvaluation && (
                <Page
                    size="A4"
                    style={{
                        flexDirection: "column",
                        paddingVertical: "4vh",
                        paddingHorizontal: "4vh",
                    }}
                >
                    <View
                        style={{
                            flexDirection: "column",
                            alignItems: "center",
                        }}
                    >
                        <Text style={{ fontSize: "2vh" }}>FICHE DE STAGE</Text>
                    </View>
                    <View
                        style={{
                            flexDirection: "column",
                            alignItems: "flex-start",
                        }}
                    >
                        <View
                            style={{
                                flexDirection: "row",
                                justifyContent: "start",
                                fontSize: 12,
                                marginTop: 35,
                            }}
                        >
                            <Text style={{ borderBottom: "1px solid #000" }}>
                                RENSEIGNEMENTS SUR L'ENTREPRISE
                            </Text>
                        </View>
                        <Text style={{ fontSize: 12, marginTop: 10 }}>
                            Raison Social: {SRB.raison_social}
                        </Text>
                        <Text style={{ fontSize: 12, marginTop: 10 }}>
                            Siege: {SRB.siege}{" "}
                        </Text>
                        <Text style={{ fontSize: 12, marginTop: 10 }}>
                            Email: {SRB.email}{" "}
                        </Text>
                        <Text style={{ fontSize: 12, marginTop: 10 }}>
                            Contact: {SRB.contact}
                        </Text>

                        <View
                            style={{
                                flexDirection: "row",
                                justifyContent: "start",
                                fontSize: 12,
                                marginTop: 35,
                            }}
                        >
                            <Text style={{ borderBottom: "1px solid #000" }}>
                                RESPONSABLE DE LIAISON POUR LE STAGE
                            </Text>
                        </View>
                        <Text style={{ fontSize: 12, marginTop: 10 }}>
                            Nom et Prenoms:{""}
                            {evaluation.encadreur.nom}
                        </Text>
                        <Text style={{ fontSize: 12, marginTop: 10 }}>
                            Fonction:{""}
                            {evaluation.encadreur.fonction}
                        </Text>
                        <Text style={{ fontSize: 12, marginTop: 10 }}>
                            Departement/Service:{""}
                            {evaluation.encadreur.serv}
                        </Text>

                        <View
                            style={{
                                flexDirection: "row",
                                justifyContent: "start",
                                fontSize: 12,
                                marginTop: 35,
                            }}
                        >
                            <Text style={{ borderBottom: "1px solid #000" }}>
                                RENSEIGNEMENT SUR LE STAGIAIRE
                            </Text>
                        </View>
                        <Text style={{ fontSize: 12, marginTop: 10 }}>
                            Nom et Prenoms:{""}
                            {evaluation.stagiaire.nom}
                        </Text>
                        <Text style={{ fontSize: 12, marginTop: 10 }}>
                            Etablissement d'Origine:{" "}
                            {evaluation.stagiaire.origine}
                        </Text>
                        <Text style={{ fontSize: 12, marginTop: 10 }}>
                            Mention: {evaluation.stagiaire.filiere}
                        </Text>
                        <Text style={{ fontSize: 12, marginTop: 10 }}>
                            Periode de Stage:{" "}
                            {evaluation.stagiaire.periode}
                        </Text>

                        <View
                            style={{
                                flexDirection: "row",
                                justifyContent: "start",
                                fontSize: 12,
                                marginTop: 35,
                            }}
                        >
                            <Text style={{ borderBottom: "1px solid #000" }}>
                                NOTES ATTRIBUEES AU STAGIAIRE
                            </Text>
                        </View>
                        <View
                            style={{
                                flexDirection: "row",
                                justifyContent: "space-between",
                                marginTop: 14,
                                width: "100%",
                                paddingRight: 60,
                            }}
                        >
                            <View
                                style={{
                                    flexDirection: "column",
                                    alignItems: "start",
                                    width: "60%",
                                }}
                            >
                                <Text style={{ fontSize: 12 }}>
                                    Comportement Professionnel :
                                </Text>
                                <Text style={{ fontSize: 12 }}>
                                    (assiduité , repect du reglement Interieur ,
                                    respect dest hierarchies existantes)
                                </Text>
                            </View>
                            <Text style={{ fontSize: 12 }}>
                                {" "}
                                {evaluation.perf.pro} /20
                            </Text>
                        </View>
                        <View
                            style={{
                                flexDirection: "row",
                                justifyContent: "space-between",
                                marginTop: 14,
                                width: "100%",
                                paddingRight: 60,
                            }}
                        >
                            <Text style={{ fontSize: 12 }}>
                                Pertinence Technique :
                            </Text>
                            <Text style={{ fontSize: 12 }}>
                                {evaluation.perf.tech} /20
                            </Text>
                        </View>
                        <View
                            style={{
                                flexDirection: "row",
                                justifyContent: "space-between",
                                marginTop: 14,
                                width: "100%",
                                paddingRight: 60,
                            }}
                        >
                            <Text style={{ fontSize: 12 }}>
                                Pertinence Pédagogique :
                            </Text>
                            <Text style={{ fontSize: 12 }}>
                                {" "}
                                {evaluation.perf.pedago} /20
                            </Text>
                        </View>
                        <View
                            style={{
                                flexDirection: "row",
                                justifyContent: "space-between",
                                marginTop: 14,
                                width: "100%",
                                paddingRight: 60,
                            }}
                        >
                            <Text style={{ fontSize: 12 }}>TOTAL :</Text>
                            <Text style={{ fontSize: 12 }}>
                                {" "}
                                {evaluation.perf.total} /60
                            </Text>
                        </View>
                        <View
                            style={{
                                flexDirection: "row",
                                justifyContent: "space-between",
                                marginTop: 20,
                                width: "100%",
                                paddingRight: 60,
                            }}
                        >
                            <Text style={{ fontSize: 12 }}>OBSERVATION :</Text>
                            <Text style={{ fontSize: 12 }}>
                                {" "}
                                {evaluation.perf.observ}
                            </Text>
                        </View>
                    </View>
                    <View
                        style={{
                            flexDirection: "row",
                            justifyContent: "space-between",
                            marginTop: 70,
                        }}
                    >
                        <Text style={{ fontSize: 14 }}>
                            Signature du Responsable de liaison ,
                        </Text>
                        <Text style={{ fontSize: 14, textAlign: "justify" }}>
                            Cachet de l'Entreprise ,
                        </Text>
                    </View>
                </Page>
            )}
        </Document>
    );
}

export default AttestationPDF;
