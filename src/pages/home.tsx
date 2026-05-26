import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { ArrowRight, CheckCircle2, ChevronRight, Mail, Globe, Send, Shield } from "lucide-react";
import roofCityImg from "../assets/roof-city.jpeg";
import roofVillaImg from "../assets/roof-villa.jpeg";

const propertyTypes = [
  "Villa",
  "Bostadsrättsförening (BRF)",
  "Företags- eller industrifastighet",
  "Annat",
];

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] } },
};

const stagger = {
  show: { transition: { staggerChildren: 0.1 } },
};

export default function Home() {
  const [form, setForm] = useState({ name: "", email: "", phone: "", property: "", address: "", message: "" });
  const [sent, setSent] = useState(false);
  const [showFloat, setShowFloat] = useState(false);

  useEffect(() => {
    const onScroll = () => setShowFloat(window.scrollY > 500);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const body = [
      `Namn: ${form.name}`,
      `E-post: ${form.email}`,
      `Telefon: ${form.phone}`,
      `Fastighetstyp: ${form.property}`,
      `Adress: ${form.address}`,
      `Meddelande: ${form.message}`,
    ].join("\n");
    const subject = encodeURIComponent(`Förfrågan om drönarinspektion – ${form.property}`);
    window.location.href = `mailto:ola@skyinspect.se?subject=${subject}&body=${encodeURIComponent(body)}`;
    setSent(true);
  }

  return (
    <div className="min-h-screen bg-[#080a0f] text-white antialiased">

      {/* ── Nav ── */}
      <nav className="fixed top-0 inset-x-0 z-50 flex items-center justify-between px-6 md:px-10 py-4
                      bg-[#080a0f]/70 backdrop-blur-xl border-b border-white/[0.06]">
        <span className="font-display font-bold text-lg tracking-[0.18em] uppercase text-white/90">
          SkyInspect
        </span>
        <div className="hidden sm:flex items-center gap-6 text-sm font-medium text-white/50">
          <a href="#om-oss" className="hover:text-white transition-colors" data-testid="link-nav-about">Om oss</a>
          <a href="#priser" className="hover:text-white transition-colors" data-testid="link-nav-prices">Priser</a>
        </div>
        <a
          href="#kontakt"
          data-testid="link-nav-contact"
          className="inline-flex items-center gap-2 text-sm font-medium px-4 py-2 rounded-full
                     border border-white/15 text-white/70 hover:text-white hover:border-white/30
                     transition-all duration-200"
        >
          <Mail className="w-3.5 h-3.5" />
          Kontakta oss
        </a>
      </nav>

      {/* ── Hero ── */}
      <section className="relative flex items-center pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#080a0f] via-[#0c1018] to-[#080a0f]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_60%_40%,rgba(56,189,248,0.04),transparent)]" />

        <div className="relative z-10 container px-6 md:px-10 mx-auto max-w-7xl">
          <motion.div
            initial="hidden"
            animate="show"
            variants={stagger}
            className="max-w-2xl"
          >
            <motion.div variants={fadeUp}
              className="inline-flex items-center gap-2 text-xs font-semibold tracking-widest uppercase
                         text-sky-400/90 mb-6 px-3 py-1.5 rounded-full border border-sky-400/20 bg-sky-400/5">
              <Shield className="w-3 h-3" />
              Certifierad A1/A3 &amp; A2
            </motion.div>

            <motion.h1 variants={fadeUp}
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.08] mb-6 text-white">
              Tak och högt belägna<br />
              <span className="text-white/55">okulära inspektioner</span>
            </motion.h1>

            <motion.p variants={fadeUp}
              className="text-base md:text-lg text-white/60 leading-relaxed mb-10 max-w-xl">
              Behöver du kontrollera tak, stuprännor, skorsten, fasad eller andra högt belägna delar?
              Vi erbjuder säkra och kostnadseffektiva okulära inspektioner med drönare för privatpersoner,
              fastighetsägare och företag.
            </motion.p>

            <motion.div variants={fadeUp} className="flex flex-col sm:flex-row gap-3">
              <a
                href="#kontakt"
                data-testid="link-hero-cta"
                className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full
                           bg-white text-black text-sm font-semibold hover:bg-white/90 transition-all"
              >
                Kontakta oss <ArrowRight className="w-4 h-4" />
              </a>
              <a
                href="#priser"
                data-testid="link-hero-prices"
                className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full
                           border border-white/15 text-white/70 text-sm font-medium hover:border-white/30
                           hover:text-white transition-all"
              >
                Se priser
              </a>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ── Photo strip ── */}
      <section className="px-4 md:px-10 pb-4">
        <div className="grid md:grid-cols-2 gap-3 h-56 md:h-80 max-w-7xl mx-auto">
          {[
            { src: roofCityImg, label: "Bostadsrättsförening" },
            { src: roofVillaImg, label: "Villa" },
          ].map(({ src, label }, i) => (
            <motion.div
              key={label}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: i * 0.12 }}
              className="relative overflow-hidden rounded-2xl group"
            >
              <img
                src={src}
                alt={`Drönarinspektion – ${label}`}
                className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
              <span className="absolute bottom-4 left-5 text-[10px] font-semibold tracking-[0.2em] uppercase text-white/50">
                {label}
              </span>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── Pricing ── */}
      <section id="priser" className="py-24 md:py-32">
        <div className="container px-6 md:px-10 mx-auto max-w-7xl">
          <div>
            <p className="text-xs font-semibold tracking-widest uppercase text-sky-400/80 mb-3">
              Prisexempel
            </p>

            <div className="grid md:grid-cols-3 gap-4 md:gap-5">
              {/* Villa */}
              <div className="relative flex flex-col gap-4 rounded-2xl p-7
                           bg-white/[0.04] border border-white/[0.08]
                           hover:bg-white/[0.07] hover:border-white/[0.14] transition-all duration-300">
                <div>
                  <p className="text-xs font-semibold tracking-widest uppercase text-white/40 mb-1">Villa</p>
                  <p className="text-3xl font-bold text-white">Från 2 500 kr</p>
                  <p className="text-sm text-white/35 mt-0.5">+ moms</p>
                </div>
                <p className="text-sm text-white/55 leading-relaxed flex-grow">
                  Inkluderar okulär tak- och ränninspektion samt högupplöst bild- och videomaterial.
                </p>
                <a href="#kontakt" data-testid="link-price-villa"
                  className="inline-flex items-center gap-1.5 text-sm font-medium text-white/60 hover:text-white transition-colors">
                  Boka nu <ArrowRight className="w-3.5 h-3.5" />
                </a>
              </div>

              {/* BRF — featured */}
              <div className="relative flex flex-col gap-4 rounded-2xl p-7
                           bg-white/[0.07] border border-sky-400/25
                           shadow-[0_0_40px_-10px_rgba(56,189,248,0.15)]">
                <div className="absolute top-0 left-0 right-0 h-px rounded-t-2xl
                                bg-gradient-to-r from-transparent via-sky-400/40 to-transparent" />
                <div>
                  <p className="text-xs font-semibold tracking-widest uppercase text-sky-400/80 mb-1">BRF</p>
                  <p className="text-3xl font-bold text-white">Från 4 500 kr</p>
                  <p className="text-sm text-white/35 mt-0.5">– 5 000 kr + moms</p>
                </div>
                <p className="text-sm text-white/55 leading-relaxed flex-grow">
                  Priset varierar beroende på fastighetens storlek, antal huskroppar och uppdragets omfattning.
                </p>
                <a href="#kontakt" data-testid="link-price-brf"
                  className="inline-flex items-center gap-1.5 text-sm font-medium text-sky-400 hover:text-sky-300 transition-colors">
                  Boka nu <ArrowRight className="w-3.5 h-3.5" />
                </a>
              </div>

              {/* Företag */}
              <div className="relative flex flex-col gap-4 rounded-2xl p-7
                           bg-white/[0.04] border border-white/[0.08]
                           hover:bg-white/[0.07] hover:border-white/[0.14] transition-all duration-300">
                <div>
                  <p className="text-xs font-semibold tracking-widest uppercase text-white/40 mb-1">Företag &amp; Industri</p>
                  <p className="text-3xl font-bold text-white">Offert</p>
                  <p className="text-sm text-white/35 mt-0.5">enligt överenskommelse</p>
                </div>
                <p className="text-sm text-white/55 leading-relaxed flex-grow">
                  Pris lämnas efter genomgång av objektets storlek, omfattning och önskat underlag.
                </p>
                <a href="#kontakt" data-testid="link-price-enterprise"
                  className="inline-flex items-center gap-1.5 text-sm font-medium text-white/60 hover:text-white transition-colors">
                  Kontakta oss <ArrowRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>

            <p className="mt-7 text-sm text-white/35 text-center">
              Framkörningsavgift tillkommer beroende på uppdragets geografiska läge. Vi utgår från Stockholm.
            </p>
          </div>
        </div>
      </section>

      {/* ── Benefits (Du får) ── */}
      <section id="om-oss" className="py-24 md:py-28 border-t border-white/[0.06]">
        <div className="container px-6 md:px-10 mx-auto max-w-4xl">
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-80px" }}
            variants={stagger}
          >
            <motion.p variants={fadeUp}
              className="text-xs font-semibold tracking-widest uppercase text-sky-400/80 mb-3">
              Vad ingår
            </motion.p>
            <motion.h2 variants={fadeUp}
              className="text-3xl md:text-4xl font-bold mb-10">Du får:</motion.h2>
            <ul className="space-y-5">
              {[
                "Högupplösta bilder och videoklipp",
                "Översiktsbilder över tak och byggnad",
                "Detaljbilder av takpannor, stuprännor, skorsten och fasad",
                "Material som kan granskas i lugn och ro eller skickas vidare till hantverkare för bedömning och offert",
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-4">
                  <CheckCircle2 className="w-5 h-5 text-sky-400 shrink-0 mt-0.5" />
                  <span className="text-white/70 leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </section>

      {/* ── Vad kan man fånga upp ── */}
      <section className="py-24 md:py-28 border-t border-white/[0.06]">
        <div className="container px-6 md:px-10 mx-auto max-w-7xl">
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-80px" }}
            variants={stagger}
          >
            <motion.h2 variants={fadeUp}
              className="text-3xl md:text-4xl font-bold mb-12 text-center">
              Vad kan man fånga upp:
            </motion.h2>

            <ul className="grid sm:grid-cols-2 lg:grid-cols-3 gap-y-4 gap-x-10">
              {[
                "Trasiga eller förskjutna takpannor",
                "Löv och blockeringar i stuprännor",
                "Skador på skorsten och plåtdetaljer",
                "Sprickor och andra synliga skador på fasad och högt belägna byggnadsdelar",
                "Lösa kablar eller takinstallationer",
                "Och ibland annat som inte skall vara där.",
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <ChevronRight className="w-4 h-4 text-sky-400/70 shrink-0 mt-0.5" />
                  <span className="text-white/65 leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </section>

      {/* ── Varför drönarinspektion ── */}
      <section className="py-24 md:py-28 border-t border-white/[0.06]">
        <div className="container px-6 md:px-10 mx-auto max-w-7xl">
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-80px" }}
            variants={stagger}
            className="max-w-3xl mx-auto text-center"
          >
            <motion.p variants={fadeUp}
              className="text-xs font-semibold tracking-widest uppercase text-sky-400/80 mb-3">
              Fördelar
            </motion.p>
            <motion.h2 variants={fadeUp}
              className="text-3xl md:text-4xl font-bold mb-12">
              Varför välja drönarinspektion?
            </motion.h2>

            <ul className="grid sm:grid-cols-2 gap-y-5 gap-x-10 text-left">
              {[
                "Ingen behöver klättra på taket",
                "Ingen ställning eller lift krävs för en första kontroll",
                "Snabb och säker dokumentation",
                "Underlag för beslut om eventuella åtgärder",
              ].map((item, i) => (
                <li key={i} className="flex items-center gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-sky-400 shrink-0" />
                  <span className="text-white/70">{item}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </section>

      {/* ── CTA banner ── */}
      <section className="py-20 border-t border-white/[0.06]">
        <div className="container px-6 md:px-10 mx-auto max-w-4xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-5xl font-bold mb-6 text-white/90">
              Upptäck skador innan de utvecklas<br className="hidden md:block" /> till kostsamma reparationer.
            </h2>
            <p className="text-white/45 mb-10 text-lg">
              Varje uppdrag och fastighet är unika. Kontakta oss så anpassar vi efter dina behov.
            </p>
            <a
              href="#kontakt"
              data-testid="link-cta-contact"
              className="inline-flex items-center gap-2.5 px-8 py-4 rounded-full
                         bg-white text-black text-sm font-semibold hover:bg-white/90 transition-all"
            >
              <Mail className="w-4 h-4" />
              Kontakta oss idag
            </a>
          </motion.div>
        </div>
      </section>

      {/* ── Contact form ── */}
      <section id="kontakt" className="py-24 md:py-32 border-t border-white/[0.06]">
        <div className="container px-6 md:px-10 mx-auto max-w-xl">
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-60px" }}
            variants={stagger}
          >
            <motion.p variants={fadeUp}
              className="text-xs font-semibold tracking-widest uppercase text-sky-400/80 mb-3">
              Kom igång
            </motion.p>
            <motion.h2 variants={fadeUp}
              className="text-3xl md:text-4xl font-bold mb-3">Kontakta oss</motion.h2>
            <motion.p variants={fadeUp}
              className="text-white/45 mb-10 text-sm leading-relaxed">
              Varje uppdrag och fastighet är unika. Kontakta oss gärna så anpassar vi inspektionen efter dina behov och önskemål.
            </motion.p>

            {sent ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col items-center justify-center py-16 text-center gap-4"
              >
                <div className="w-14 h-14 rounded-full bg-sky-400/10 border border-sky-400/20 flex items-center justify-center">
                  <CheckCircle2 className="w-6 h-6 text-sky-400" />
                </div>
                <p className="text-lg font-semibold text-white">Din e-postklient öppnas nu.</p>
                <p className="text-white/45 text-sm">Skicka meddelandet så återkommer vi så snart som möjligt.</p>
                <button
                  onClick={() => setSent(false)}
                  data-testid="button-reset-form"
                  className="mt-2 text-xs text-white/35 underline underline-offset-4 hover:text-white/70 transition-colors"
                >
                  Tillbaka till formuläret
                </button>
              </motion.div>
            ) : (
              <motion.form
                variants={stagger}
                onSubmit={handleSubmit}
                className="space-y-4"
                data-testid="form-contact"
              >
                <motion.div variants={fadeUp} className="grid sm:grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-medium text-white/40 uppercase tracking-wider" htmlFor="name">Namn *</label>
                    <input
                      id="name" name="name" type="text" required
                      value={form.name} onChange={handleChange}
                      placeholder="För- och efternamn"
                      data-testid="input-name"
                      className="px-4 py-3 rounded-xl bg-white/[0.05] border border-white/[0.1] text-white text-sm
                                 placeholder:text-white/25 focus:outline-none focus:border-sky-400/40 focus:bg-white/[0.08]
                                 transition-all duration-200"
                    />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-medium text-white/40 uppercase tracking-wider" htmlFor="phone">Telefon</label>
                    <input
                      id="phone" name="phone" type="tel"
                      value={form.phone} onChange={handleChange}
                      placeholder="070-000 00 00"
                      data-testid="input-phone"
                      className="px-4 py-3 rounded-xl bg-white/[0.05] border border-white/[0.1] text-white text-sm
                                 placeholder:text-white/25 focus:outline-none focus:border-sky-400/40 focus:bg-white/[0.08]
                                 transition-all duration-200"
                    />
                  </div>
                </motion.div>

                <motion.div variants={fadeUp} className="flex flex-col gap-1.5">
                  <label className="text-xs font-medium text-white/40 uppercase tracking-wider" htmlFor="email">E-post *</label>
                  <input
                    id="email" name="email" type="email" required
                    value={form.email} onChange={handleChange}
                    placeholder="din@epost.se"
                    data-testid="input-email"
                    className="px-4 py-3 rounded-xl bg-white/[0.05] border border-white/[0.1] text-white text-sm
                               placeholder:text-white/25 focus:outline-none focus:border-sky-400/40 focus:bg-white/[0.08]
                               transition-all duration-200"
                  />
                </motion.div>

                <motion.div variants={fadeUp} className="flex flex-col gap-1.5">
                  <label className="text-xs font-medium text-white/40 uppercase tracking-wider" htmlFor="property">Fastighetstyp *</label>
                  <select
                    id="property" name="property" required
                    value={form.property} onChange={handleChange}
                    data-testid="select-property"
                    className="px-4 py-3 rounded-xl bg-white/[0.05] border border-white/[0.1] text-white text-sm
                               focus:outline-none focus:border-sky-400/40 focus:bg-white/[0.08]
                               transition-all duration-200 appearance-none"
                  >
                    <option value="" disabled className="bg-[#0f1117]">Välj fastighetstyp</option>
                    {propertyTypes.map(t => (
                      <option key={t} value={t} className="bg-[#0f1117]">{t}</option>
                    ))}
                  </select>
                </motion.div>

                <motion.div variants={fadeUp} className="flex flex-col gap-1.5">
                  <label className="text-xs font-medium text-white/40 uppercase tracking-wider" htmlFor="address">Adress / Ort</label>
                  <input
                    id="address" name="address" type="text"
                    value={form.address} onChange={handleChange}
                    placeholder="Gatuadress, stad"
                    data-testid="input-address"
                    className="px-4 py-3 rounded-xl bg-white/[0.05] border border-white/[0.1] text-white text-sm
                               placeholder:text-white/25 focus:outline-none focus:border-sky-400/40 focus:bg-white/[0.08]
                               transition-all duration-200"
                  />
                </motion.div>

                <motion.div variants={fadeUp} className="flex flex-col gap-1.5">
                  <label className="text-xs font-medium text-white/40 uppercase tracking-wider" htmlFor="message">Meddelande</label>
                  <textarea
                    id="message" name="message" rows={4}
                    value={form.message} onChange={handleChange}
                    placeholder="Beskriv gärna uppdraget, ev. kända skador eller önskemål…"
                    data-testid="textarea-message"
                    className="px-4 py-3 rounded-xl bg-white/[0.05] border border-white/[0.1] text-white text-sm
                               placeholder:text-white/25 focus:outline-none focus:border-sky-400/40 focus:bg-white/[0.08]
                               transition-all duration-200 resize-none"
                  />
                </motion.div>

                <motion.button
                  variants={fadeUp}
                  type="submit"
                  data-testid="button-submit-contact"
                  className="w-full flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-xl
                             bg-white text-black text-sm font-semibold hover:bg-white/90 transition-all duration-200"
                >
                  <Send className="w-4 h-4" />
                  Skicka förfrågan
                </motion.button>

                <motion.p variants={fadeUp} className="text-xs text-white/25 text-center">
                  Formuläret öppnar din e-postklient med uppgifterna ifyllda.
                </motion.p>
              </motion.form>
            )}
          </motion.div>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="py-10 border-t border-white/[0.06]">
        <div className="container px-6 md:px-10 mx-auto max-w-7xl flex flex-col md:flex-row items-center justify-between gap-5">
          <span className="font-display font-bold text-lg tracking-[0.18em] uppercase text-white/25">
            SkyInspect
          </span>
          <div className="flex flex-col sm:flex-row items-center gap-5 md:gap-10">
            <a href="https://www.skyinspect.se" target="_blank" rel="noreferrer"
              data-testid="link-footer-website"
              className="flex items-center gap-2 text-sm text-white/35 hover:text-white/70 transition-colors">
              <Globe className="w-4 h-4" />
              www.skyinspect.se
            </a>
            <a href="mailto:ola@skyinspect.se"
              data-testid="link-footer-email"
              className="flex items-center gap-2 text-sm text-white/35 hover:text-white/70 transition-colors">
              <Mail className="w-4 h-4" />
              ola@skyinspect.se
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
