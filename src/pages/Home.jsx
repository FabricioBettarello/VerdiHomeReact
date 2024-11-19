import React, { useState } from "react";
import Logo from "../assets/images/logo.png";
import { NavLink } from 'react-router-dom';
import emailjs from "emailjs-com";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const HomePage = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const sendEmail = (e) => {
        e.preventDefault();

        emailjs
            .sendForm(
                "service_x28sxeg",
                "template_bpgvo1m",
                e.target,
                "sjcRQ7raDojf1fG2G"
            )
            .then(
                (result) => {
                    console.log("Sucesso:", result.text);
                    toast.success("Mensagem enviada com sucesso!");
                },
                (error) => {
                    console.error("Erro:", error.text);
                    toast.error("Erro ao enviar a mensagem. Tente novamente.");
                }
            );
        e.target.reset();
    };

    return (
        <>
            <ToastContainer />
            <div className="homepage">
                <header className="navbar">
                    <div className="container navbar-container">
                        <h1 className="logo"><a href="#home">VerdiHome</a></h1>
                        <nav className={`nav-links ${isMenuOpen ? "open" : ""}`}>
                            <a href="#features">Recursos</a>
                            <a href="#about">Sobre Nós</a>
                            <a href="#contact">Contato</a>
                            <NavLink to="/chatbot" className="access-button">
                                Acessar Plataforma
                            </NavLink>
                        </nav>
                        <button
                            className="hamburger"
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                        >
                            <i className={`bi ${isMenuOpen ? "bi-x" : "bi-list"}`}></i>
                        </button>
                    </div>
                </header>

                <section className="hero" id="home">
                    <div className="container hero-content">
                        <div className="hero-text">
                            <h2>Adote práticas sustentáveis com VerdiHome</h2>
                            <p>
                                VerdiHome é uma plataforma inteligente de bate-papo com IA projetada para otimizar seus gastos com energia. Com recomendações personalizadas e boas práticas de uso sustentável, ajudamos você a economizar e adotar soluções mais eficientes, contribuindo para um futuro mais verde e consciente.
                            </p>
                            <NavLink to="/chatbot" className="cta-button">Comece Agora</NavLink>
                        </div>
                        <div className="hero-image">
                            <img src={Logo} alt="Logo VerdiHome" />
                        </div>
                    </div>
                </section>

                <section id="features" className="features">
                    <div className="container">
                        <h3>Recursos do VerdiHome</h3>
                        <div className="features-grid">
                            <div className="feature-item">
                                <i className="bi bi-lightning-charge feature-icon"></i>
                                <h4>Economia Inteligente</h4>
                                <p>
                                    Descubra como reduzir seus custos de energia com sugestões baseadas no
                                    seu consumo diário.
                                </p>
                            </div>
                            <div className="feature-item">
                                <i className="bi bi-shield-check feature-icon"></i>
                                <h4>Sustentabilidade Garantida</h4>
                                <p>
                                    Garanta práticas sustentáveis no seu dia a dia e contribua para um futuro
                                    mais verde.
                                </p>
                            </div>
                            <div className="feature-item">
                                <i className="bi bi-chat-dots feature-icon"></i>
                                <h4>Bate-Papo com IA</h4>
                                <p>
                                    Tire dúvidas e receba orientações instantâneas com nossa assistente
                                    virtual integrada.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                <section id="about" className="about">
                    <div className="container">
                        <h3>Sobre Nós</h3>
                        <p>
                            Na <strong>VerdiHome</strong>, acreditamos que um futuro sustentável é alcançado através de ações conscientes.
                            Somos uma plataforma inovadora que combina tecnologia de ponta e inteligência artificial para ajudar você a monitorar e otimizar o consumo de energia em sua casa.
                        </p>
                        <p>
                            Nossa missão é empoderar indivíduos e famílias a adotar práticas mais eficientes e sustentáveis, economizando recursos e contribuindo para a preservação do planeta.
                            Através de um assistente virtual, transformamos o gerenciamento de energia em uma experiência prática e eficiente.
                        </p>
                        <p>
                            Junte-se a nós nessa jornada rumo a um estilo de vida mais ecológico e consciente. <strong>VerdiHome</strong>: tecnologia a serviço da sustentabilidade.
                        </p>
                    </div>
                </section>
                <section id="contact" className="contact">
                    <div className="container">
                        <h3>Entre em Contato <i className="bi bi-envelope-at"></i></h3>
                        <form className="contact-form" onSubmit={sendEmail}>
                            <label htmlFor="name">Nome</label>
                            <input type="text" id="name" name="name" placeholder="Seu nome" required />
                            <label htmlFor="email">Email</label>
                            <input type="email" id="email" name="email" placeholder="Seu email" required />
                            <label htmlFor="message">Mensagem</label>
                            <textarea id="message" name="message" placeholder="Sua mensagem" rows="4" required></textarea>
                            <button type="submit" className="cta-button">Enviar</button>
                        </form>
                    </div>
                </section>

                <footer className="footer">
                    <div className="container">
                        <p>© 2024 VerdiHome. Todos os direitos reservados.</p>
                    </div>
                </footer>
            </div>
        </>
    );
};

export default HomePage;