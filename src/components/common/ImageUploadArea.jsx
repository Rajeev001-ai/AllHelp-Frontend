import { ImagePlus, UploadCloud } from 'lucide-react'
import { useRef, useState } from 'react'

function ImageUploadArea({ compact = false, isUploading, label = 'Upload image', onUpload, preview }) {
  const inputRef = useRef(null)
  const [localPreview, setLocalPreview] = useState('')

  const handleFile = (file) => {
    if (!file) return
    setLocalPreview(URL.createObjectURL(file))
    onUpload(file)
  }

  return (
    <div
      className={`group grid cursor-pointer place-items-center rounded-[1.5rem] border border-dashed border-slate-300 bg-slate-50 p-5 text-center transition hover:border-emerald-400 hover:bg-emerald-50 ${compact ? 'min-h-36' : 'min-h-52'}`}
      role="button"
      tabIndex={0}
      onClick={() => inputRef.current?.click()}
      onDragOver={(event) => event.preventDefault()}
      onDrop={(event) => {
        event.preventDefault()
        handleFile(event.dataTransfer.files?.[0])
      }}
    >
      <input accept="image/*" className="hidden" ref={inputRef} type="file" onChange={(event) => handleFile(event.target.files?.[0])} />
      {(localPreview || preview) ? (
        <img alt="" className="h-32 w-32 rounded-3xl object-cover shadow-xl" src={localPreview || preview} />
      ) : (
        <div className="grid place-items-center">
          <div className="grid h-14 w-14 place-items-center rounded-2xl bg-white text-emerald-700 shadow-lg">
            {compact ? <ImagePlus className="h-6 w-6" /> : <UploadCloud className="h-7 w-7" />}
          </div>
          <p className="mt-4 font-black text-slate-900">{isUploading ? 'Uploading...' : label}</p>
          <p className="mt-1 text-sm font-bold text-slate-500">Drag and drop or click</p>
        </div>
      )}
    </div>
  )
}

export default ImageUploadArea
