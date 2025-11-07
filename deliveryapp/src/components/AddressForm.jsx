import { useState } from 'react';

const AddressForm = ({ onSubmit, initialAddress }) => {
  const [address, setAddress] = useState(initialAddress || {
    street: '',
    apartment: '',
    city: '',
    zipCode: '',
    state: '',
    isDefault: false
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(address);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <input
          type="text"
          placeholder="Street Address"
          value={address.street}
          onChange={(e) => setAddress({ ...address, street: e.target.value })}
          className="w-full px-3 py-2 border rounded focus:ring-primary focus:border-primary"
          required
        />
      </div>
      <div>
        <input
          type="text"
          placeholder="Apartment, Suite, etc. (optional)"
          value={address.apartment}
          onChange={(e) => setAddress({ ...address, apartment: e.target.value })}
          className="w-full px-3 py-2 border rounded focus:ring-primary focus:border-primary"
        />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <input
          type="text"
          placeholder="City"
          value={address.city}
          onChange={(e) => setAddress({ ...address, city: e.target.value })}
          className="w-full px-3 py-2 border rounded focus:ring-primary focus:border-primary"
          required
        />
        <input
          type="text"
          placeholder="State"
          value={address.state}
          onChange={(e) => setAddress({ ...address, state: e.target.value })}
          className="w-full px-3 py-2 border rounded focus:ring-primary focus:border-primary"
          required
        />
      </div>
      <div>
        <input
          type="text"
          placeholder="ZIP Code"
          value={address.zipCode}
          onChange={(e) => setAddress({ ...address, zipCode: e.target.value })}
          className="w-full px-3 py-2 border rounded focus:ring-primary focus:border-primary"
          required
        />
      </div>
      <div className="flex items-center">
        <input
          type="checkbox"
          id="default"
          checked={address.isDefault}
          onChange={(e) => setAddress({ ...address, isDefault: e.target.checked })}
          className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
        />
        <label htmlFor="default" className="ml-2 block text-sm text-gray-900">
          Set as default address
        </label>
      </div>
      <button
        type="submit"
        className="w-full bg-primary text-white py-2 px-4 rounded-md hover:bg-primary/90
          focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
      >
        Save Address
      </button>
    </form>
  );
};

export default AddressForm;