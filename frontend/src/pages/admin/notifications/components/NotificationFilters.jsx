const filters = [

  "All",
  "Unread",
  "HR",
  "Task",
  "System"

];

export default function NotificationFilters({

  activeFilter,
  setActiveFilter

}) {

  return (

    <div className="notification-filters">

      {
        filters.map((filter) => (

          <button
            key={filter}
            className={
              activeFilter === filter
                ? "filter-btn active"
                : "filter-btn"
            }
            onClick={() =>
              setActiveFilter(filter)
            }
          >

            {filter}

          </button>
        ))
      }

    </div>
  );
}