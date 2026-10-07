export default function CheckoutSuccessPage() {
  return (
    <div className="max-w-lg mx-auto my-16 text-center bg-white p-8 border rounded-xl shadow-sm">
      <div className="text-emerald-500 text-5xl mb-4">✓</div>
      <h1 className="text-2xl font-bold">Thank you for your purchase!</h1>
      <p className="text-slate-600 mt-2">
        A download link has been sent to your email address. You can also download your files directly below.
      </p>
    </div>
  );
}
