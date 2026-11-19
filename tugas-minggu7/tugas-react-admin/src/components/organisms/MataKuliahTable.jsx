export default function MataKuliahTable({
  mataKuliah,
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
            <th className="py-3 px-4">Kode MK</th>
            <th className="py-3 px-4">Nama Mata Kuliah</th>
            <th className="py-3 px-4">SKS</th>
            {(canUpdate || canDelete) && (
              <th className="py-3 px-4 text-center">Aksi</th>
            )}
          </tr>
        </thead>
        <tbody>
          {mataKuliah.length === 0 ? (
            <tr>
              <td colSpan="4" className="py-4 text-center text-gray-500">
                Data mata kuliah kosong.
              </td>
            </tr>
          ) : (
            mataKuliah.map((item) => (
              <tr
                key={item.id}
                className="even:bg-gray-50 odd:bg-white border-b hover:bg-gray-100 transition-colors"
              >
                <td className="py-3 px-4 font-medium">{item.kode_mk}</td>
                <td className="py-3 px-4">{item.nama_mk}</td>
                <td className="py-3 px-4">{item.sks} SKS</td>
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