export default function DosenTable({
  dosen,
  openEditModal,
  onDelete,
  canUpdate,
  canDelete,
}) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm text-left text-gray-700 border-collapse">
        <thead className="bg-blue-600 text-white uppercase text-xs">
          <tr>
            <th className="py-3 px-4">NIDN</th>
            <th className="py-3 px-4">Nama Dosen</th>
            <th className="py-3 px-4">Bidang Keahlian</th>
            {(canUpdate || canDelete) && (
              <th className="py-3 px-4 text-center">Aksi</th>
            )}
          </tr>
        </thead>
        <tbody>
          {dosen.length === 0 ? (
            <tr>
              <td colSpan="4" className="py-4 text-center text-gray-500">
                Data dosen kosong.
              </td>
            </tr>
          ) : (
            dosen.map((item) => (
              <tr
                key={item.id}
                className="even:bg-gray-50 odd:bg-white border-b hover:bg-gray-100 transition-colors"
              >
                <td className="py-3 px-4 font-medium">{item.nidn}</td>
                <td className="py-3 px-4">{item.nama}</td>
                <td className="py-3 px-4">{item.bidang}</td>
                {(canUpdate || canDelete) && (
                  <td className="py-3 px-4 text-center space-x-2">
                    {canUpdate && (
                      <button
                        onClick={() => openEditModal(item)}
                        className="bg-yellow-500 hover:bg-yellow-600 text-white px-2.5 py-1 rounded text-xs"
                      >
                        Edit
                      </button>
                    )}
                    {canDelete && (
                      <button
                        onClick={() => onDelete(item.id)}
                        className="bg-red-600 hover:bg-red-700 text-white px-2.5 py-1 rounded text-xs"
                      >
                        Hapus
                      </button>
                    )}
                  </td>
                )}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}