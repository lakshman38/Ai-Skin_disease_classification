import * as tf from '@tensorflow/tfjs'

let model = null

// Labels: update this list to match your model's classes and order.
export const LABELS = [
  'Benign', 'Malignant', 'Eczema', 'Psoriasis', 'Fungal Infection'
]

export async function loadModel(path = '/model/model.json'){
  if(model) return model
  try{
    model = await tf.loadLayersModel(path)
    return model
  }catch(e){
    console.warn('TFJS model load failed:', e)
    model = null
    throw e
  }
}

export async function predictFromUrl(url, inputSize = 224){
  if(!model) await loadModel()
  // create image element
  const img = new Image()
  img.crossOrigin = 'anonymous'
  img.src = url
  await new Promise((res, rej)=>{
    img.onload = res
    img.onerror = () => rej(new Error('Image load error'))
  })

  let tensor = tf.browser.fromPixels(img).toFloat()
  tensor = tf.image.resizeBilinear(tensor, [inputSize, inputSize])
  tensor = tensor.div(255.0).expandDims(0)

  const preds = model.predict(tensor)
  const scores = Array.isArray(preds) ? await Promise.all(preds.map(p=>p.data())) : await preds.data()
  // if preds is typed array-like, convert to normal array
  const arr = Array.from(scores)
  return arr
}
