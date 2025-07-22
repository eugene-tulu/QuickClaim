export function TasksList() {
  const tasks = [
    {
      id: 1,
      title: "Upload bank statement",
      description: "Required for direct deposit setup",
      urgent: true,
    },
    {
      id: 2,
      title: "Verify phone number",
      description: "Get SMS updates on your claims",
      urgent: false,
    },
    {
      id: 3,
      title: "Complete tax information",
      description: "Required for benefit calculations",
      urgent: false,
    },
  ];

  return (
    <div className="bg-white rounded-lg border border-gray-100 p-6">
      <h3 className="text-lg font-semibold text-charcoal mb-4">
        Action Items
      </h3>
      
      <div className="space-y-3">
        {tasks.map((task) => (
          <div
            key={task.id}
            className="flex items-start space-x-3 p-3 rounded-lg hover:bg-gray-50 cursor-pointer"
          >
            <div className={`w-2 h-2 rounded-full mt-2 ${
              task.urgent ? 'bg-red-500' : 'bg-gray-300'
            }`} />
            <div className="flex-1">
              <h4 className="font-medium text-charcoal text-sm">
                {task.title}
              </h4>
              <p className="text-xs text-gray-600 mt-1">
                {task.description}
              </p>
            </div>
            <span className="text-imperial-purple text-sm">→</span>
          </div>
        ))}
      </div>
    </div>
  );
}
