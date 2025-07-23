interface TasksListProps {
  darkMode?: boolean;
}

export function TasksList({ darkMode = false }: TasksListProps) {
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
    <div className={`rounded-2xl border transition-colors duration-300 ${
      darkMode 
        ? 'bg-gray-900/50 border-gray-800' 
        : 'bg-white border-gray-100'
    }`}>
      <div className="p-6">
        <h3 className={`text-lg font-semibold mb-6 ${darkMode ? 'text-white' : 'text-charcoal'}`}>
          Action Items
        </h3>
        
        <div className="space-y-4">
          {tasks.map((task, index) => (
            <div
              key={task.id}
              className={`flex items-start space-x-4 p-4 rounded-xl cursor-pointer transition-all duration-200 animate-in ${
                darkMode 
                  ? 'hover:bg-gray-800/50' 
                  : 'hover:bg-gray-50'
              }`}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className={`w-2 h-2 rounded-full mt-3 flex-shrink-0 ${
                task.urgent ? 'bg-red-500' : (darkMode ? 'bg-gray-600' : 'bg-gray-300')
              }`} />
              <div className="flex-1 min-w-0">
                <h4 className={`font-medium text-sm mb-1 ${darkMode ? 'text-white' : 'text-charcoal'}`}>
                  {task.title}
                </h4>
                <p className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  {task.description}
                </p>
              </div>
              <span className="text-imperial-purple text-sm flex-shrink-0">→</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}