export function ContactInfo() {
  return (
    <div className="space-y-8">
      <div>
        <h3 className="flex items-center gap-2 text-xl font-semibold mb-3">
          <svg className="w-6 h-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          Ubicación
        </h3>
        <address className="not-italic">
          Camí de Sant Joan, 4<br />
          43391 Vinyols i els Arcs,<br />
          España
        </address>
      </div>

      <div>
        <h3 className="flex items-center gap-2 text-xl font-semibold mb-3">
          <svg className="w-6 h-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
          </svg>
          Teléfono
        </h3>
        <div className="space-y-1">
          <a href="tel:+34977350508" className="block hover:text-primary">
            +34 977 350 508
          </a>
          <a href="tel:+34646629414" className="block hover:text-primary">
            +34 646 629 414
          </a>
        </div>
      </div>

      <div>
        <h3 className="flex items-center gap-2 text-xl font-semibold mb-3">
          <svg className="w-6 h-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
          Email
        </h3>
        <a href="mailto:plakordivisiones@hotmail.com" className="hover:text-primary">
          plakordivisiones@hotmail.com
        </a>
      </div>

      <div className="pt-6">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2234.5678901234567!2d1.234567!3d41.234567!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDHCsDEyJzM0LjUiTiAxwrAyMyczNC41IkU!5e0!3m2!1ses!2ses!4v1234567890123!5m2!1ses!2ses"
          width="100%"
          height="300"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          className="rounded-lg"
        ></iframe>
      </div>
    </div>
  );
} 