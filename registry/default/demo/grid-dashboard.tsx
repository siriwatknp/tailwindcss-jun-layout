export default function GridDashboardDemo() {
  return (
    <div className="w-full border rounded-lg bg-background p-4">
      <div className="jun-grid gap-6">
        {/* Stats row */}
        <div className="jun-gridItem col-span-12 md:col-span-3">
          <div className="bg-card border rounded-lg p-6">
            <div className="text-sm text-muted-foreground mb-2">
              Total Users
            </div>
            <div className="text-2xl font-bold">12,345</div>
            <div className="text-xs text-green-600 mt-2">
              +12.5% from last month
            </div>
          </div>
        </div>
        <div className="jun-gridItem col-span-12 md:col-span-3">
          <div className="bg-card border rounded-lg p-6">
            <div className="text-sm text-muted-foreground mb-2">Revenue</div>
            <div className="text-2xl font-bold">$84,250</div>
            <div className="text-xs text-green-600 mt-2">
              +8.2% from last month
            </div>
          </div>
        </div>
        <div className="jun-gridItem col-span-12 md:col-span-3">
          <div className="bg-card border rounded-lg p-6">
            <div className="text-sm text-muted-foreground mb-2">
              Conversions
            </div>
            <div className="text-2xl font-bold">3.24%</div>
            <div className="text-xs text-red-600 mt-2">
              -2.1% from last month
            </div>
          </div>
        </div>
        <div className="jun-gridItem col-span-12 md:col-span-3">
          <div className="bg-card border rounded-lg p-6">
            <div className="text-sm text-muted-foreground mb-2">
              Active Sessions
            </div>
            <div className="text-2xl font-bold">1,842</div>
            <div className="text-xs text-green-600 mt-2">
              +5.7% from last hour
            </div>
          </div>
        </div>

        {/* Main content and sidebar */}
        <div className="jun-gridItem col-span-12 lg:col-span-8">
          <div className="bg-card border rounded-lg p-6 h-64">
            <h3 className="font-semibold mb-4">Analytics Chart</h3>
            <div className="bg-muted rounded h-48 flex items-center justify-center text-muted-foreground">
              Chart placeholder
            </div>
          </div>
        </div>
        <div className="jun-gridItem col-span-12 lg:col-span-4">
          <div className="bg-card border rounded-lg p-6 h-64">
            <h3 className="font-semibold mb-4">Recent Activity</h3>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <div className="text-sm">New user registered</div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <div className="text-sm">Payment received</div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                <div className="text-sm">New comment</div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                <div className="text-sm">Task completed</div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer widgets */}
        <div className="jun-gridItem col-span-12 md:col-span-6">
          <div className="bg-card border rounded-lg p-6">
            <h3 className="font-semibold mb-4">Top Products</h3>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-sm">Product A</span>
                <span className="text-sm text-muted-foreground">842 sales</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm">Product B</span>
                <span className="text-sm text-muted-foreground">635 sales</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm">Product C</span>
                <span className="text-sm text-muted-foreground">421 sales</span>
              </div>
            </div>
          </div>
        </div>
        <div className="jun-gridItem col-span-12 md:col-span-6">
          <div className="bg-card border rounded-lg p-6">
            <h3 className="font-semibold mb-4">Traffic Sources</h3>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-sm">Direct</span>
                <span className="text-sm text-muted-foreground">42%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm">Organic Search</span>
                <span className="text-sm text-muted-foreground">31%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm">Social Media</span>
                <span className="text-sm text-muted-foreground">27%</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
