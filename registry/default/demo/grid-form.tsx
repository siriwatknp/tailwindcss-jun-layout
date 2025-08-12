export default function GridFormDemo() {
  return (
    <div className="w-full border rounded-lg bg-background p-6">
      <form className="space-y-6">
        <div className="jun-grid gap-4">
          {/* Personal Information Section */}
          <div className="jun-gridItem col-span-12">
            <h3 className="text-lg font-semibold mb-4">Personal Information</h3>
          </div>

          <div className="jun-gridItem col-span-12 md:col-span-6">
            <label className="block text-sm font-medium mb-2">First Name</label>
            <input
              type="text"
              className="w-full px-3 py-2 border rounded-md bg-background"
              placeholder="John"
            />
          </div>

          <div className="jun-gridItem col-span-12 md:col-span-6">
            <label className="block text-sm font-medium mb-2">Last Name</label>
            <input
              type="text"
              className="w-full px-3 py-2 border rounded-md bg-background"
              placeholder="Doe"
            />
          </div>

          <div className="jun-gridItem col-span-12 md:col-span-8">
            <label className="block text-sm font-medium mb-2">
              Email Address
            </label>
            <input
              type="email"
              className="w-full px-3 py-2 border rounded-md bg-background"
              placeholder="john.doe@example.com"
            />
          </div>

          <div className="jun-gridItem col-span-12 md:col-span-4">
            <label className="block text-sm font-medium mb-2">
              Phone Number
            </label>
            <input
              type="tel"
              className="w-full px-3 py-2 border rounded-md bg-background"
              placeholder="+1 (555) 123-4567"
            />
          </div>
        </div>

        {/* Address Section */}
        <div className="jun-grid gap-4">
          <div className="jun-gridItem col-span-12">
            <h3 className="text-lg font-semibold mb-4">Address</h3>
          </div>

          <div className="jun-gridItem col-span-12">
            <label className="block text-sm font-medium mb-2">
              Street Address
            </label>
            <input
              type="text"
              className="w-full px-3 py-2 border rounded-md bg-background"
              placeholder="123 Main Street"
            />
          </div>

          <div className="jun-gridItem col-span-12 md:col-span-5">
            <label className="block text-sm font-medium mb-2">City</label>
            <input
              type="text"
              className="w-full px-3 py-2 border rounded-md bg-background"
              placeholder="New York"
            />
          </div>

          <div className="jun-gridItem col-span-12 md:col-span-4">
            <label className="block text-sm font-medium mb-2">
              State / Province
            </label>
            <select className="w-full px-3 py-2 border rounded-md bg-background">
              <option>Select state</option>
              <option>New York</option>
              <option>California</option>
              <option>Texas</option>
            </select>
          </div>

          <div className="jun-gridItem col-span-12 md:col-span-3">
            <label className="block text-sm font-medium mb-2">
              ZIP / Postal Code
            </label>
            <input
              type="text"
              className="w-full px-3 py-2 border rounded-md bg-background"
              placeholder="10001"
            />
          </div>
        </div>

        {/* Additional Information */}
        <div className="jun-grid gap-4">
          <div className="jun-gridItem col-span-12">
            <h3 className="text-lg font-semibold mb-4">
              Additional Information
            </h3>
          </div>

          <div className="jun-gridItem col-span-12 lg:col-span-8">
            <label className="block text-sm font-medium mb-2">Bio</label>
            <textarea
              className="w-full px-3 py-2 border rounded-md bg-background"
              rows={4}
              placeholder="Tell us about yourself..."
            />
          </div>

          <div className="jun-gridItem col-span-12 lg:col-span-4">
            <label className="block text-sm font-medium mb-2">
              Preferences
            </label>
            <div className="space-y-2">
              <label className="flex items-center">
                <input type="checkbox" className="mr-2" />
                <span className="text-sm">Email notifications</span>
              </label>
              <label className="flex items-center">
                <input type="checkbox" className="mr-2" />
                <span className="text-sm">SMS alerts</span>
              </label>
              <label className="flex items-center">
                <input type="checkbox" className="mr-2" />
                <span className="text-sm">Newsletter subscription</span>
              </label>
            </div>
          </div>
        </div>

        {/* Form Actions */}
        <div className="jun-grid gap-4">
          <div className="jun-gridItem col-span-12 flex justify-end gap-3">
            <button
              type="button"
              className="px-4 py-2 border rounded-md hover:bg-muted"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90"
            >
              Save Changes
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
