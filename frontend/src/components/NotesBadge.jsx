export default function NotesBadge({ notes }) {
  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
      {notes?.map((note, index) => (
        <div
          key={index}
          style={{
            backgroundColor: note.color,
            padding: '6px 12px',
            borderRadius: '4px',
            fontSize: '14px',
            fontWeight: '500',
            color: '#333'
          }}
        >
          {note.name}
        </div>
      ))}
    </div>
  );
}
