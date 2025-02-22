'use client';

import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { toast } from '@/components/ui/toast';

type FormData = {
  name: string;
  phone: string;
  email: string;
  message: string;
};

export function ContactForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    nombre: '',
    telefono: '',
    email: '',
    mensaje: ''
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>();

  const onSubmit = async (data: FormData) => {
    setIsLoading(true);

    try {
      // Здесь будет отправка формы
      await new Promise(resolve => setTimeout(resolve, 1000)); // Имитация отправки
      toast.success('Mensaje enviado correctamente');
      reset();
    } catch (error) {
      toast.error('Error al enviar el mensaje');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="py-20">
      <Container>
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-primary mb-4">
              Contacta con Nosotros
            </h2>
            <p className="text-lg text-secondary mb-8">
              Solicita información sin compromiso. Estaremos encantados de ayudarte con tu proyecto.
            </p>
            
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <svg className="w-6 h-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <div>
                  <p className="font-medium">Teléfono</p>
                  <a href="tel:+34977350508" className="text-primary hover:underline">+34 977 350 508</a>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <svg className="w-6 h-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <div>
                  <p className="font-medium">Email</p>
                  <a href="mailto:plakordivisiones@hotmail.com" className="text-primary hover:underline">
                    plakordivisiones@hotmail.com
                  </a>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="bg-white rounded-xl shadow-lg p-6 lg:p-8"
          >
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block mb-2">
                    Nombre <span className="text-red-500">*</span>
                  </label>
                  <Input
                    value={formData.nombre}
                    onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
                    required
                    placeholder="Tu nombre completo"
                  />
                </div>

                <div>
                  <label className="block mb-2">
                    Teléfono <span className="text-red-500">*</span>
                  </label>
                  <Input
                    value={formData.telefono}
                    onChange={(e) => setFormData({ ...formData, telefono: e.target.value })}
                    required
                    type="tel"
                    placeholder="+34 XXX XXX XXX"
                  />
                </div>
              </div>

              <div>
                <label className="block mb-2">
                  Email (opcional)
                </label>
                <Input
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  type="email"
                  placeholder="tu@email.com"
                />
              </div>

              <div>
                <label className="block mb-2">
                  Mensaje <span className="text-red-500">*</span>
                </label>
                <Textarea
                  value={formData.mensaje}
                  onChange={(e) => setFormData({ ...formData, mensaje: e.target.value })}
                  required
                  rows={6}
                  placeholder="Describe tu proyecto o consulta"
                />
              </div>

              <Button
                type="submit"
                variant="cta"
                className="w-full md:w-auto"
                disabled={isLoading}
              >
                {isLoading ? 'Enviando...' : 'Enviar mensaje'}
              </Button>
            </form>
          </motion.div>
        </div>
      </Container>
    </section>
  );
} 