<script>
import { submitForm } from '$lib/api';

async function handleLlamadaSubmit(event) {
  const formData = new FormData(event.target);
  try {
    await submitForm({
      nombre: formData.get('nombre'),
      telefono: formData.get('telefono'),
      tipo: 'llamada'
    });
    // Показать сообщение об успехе
  } catch (error) {
    // Показать сообщение об ошибке
  }
}

async function handlePresupuestoSubmit(event) {
  const formData = new FormData(event.target);
  try {
    await submitForm({
      nombre: formData.get('nombre'),
      telefono: formData.get('telefono'),
      tipo: 'presupuesto'
    });
    // Показать сообщение об успехе
  } catch (error) {
    // Показать сообщение об ошибке
  }
}
</script>

<form on:submit|preventDefault={handleLlamadaSubmit}>
  <input type="text" name="nombre" required placeholder="Nombre">
  <input type="tel" name="telefono" required placeholder="Teléfono">
  <button type="submit">Solicitar llamada</button>
</form>

<form on:submit|preventDefault={handlePresupuestoSubmit}>
  <input type="text" name="nombre" required placeholder="Nombre">
  <input type="tel" name="telefono" required placeholder="Teléfono">
  <button type="submit">Solicitar presupuesto</button>
</form> 