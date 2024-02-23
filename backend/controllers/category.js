const Category = require('../models/category')

exports.getAllCategories = async (req, res) => {
  try {
    const categories = await Category.find()
    const categoriesMapped = categories.map(item => {
      return {
        id: item._id,
        name: item.name
      }
    })
    res.status(200).json(categoriesMapped)
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error'})
  }
}

exports.getCategoryById = async (req, res) => {
  const categoryId = req.params.id
  try {
    const category = await Category.findById(categoryId)
    if (!category) {
      return res.status(404).json({ error: 'Kategori bulunamadı' })
    }

    res.status(200).json(category)
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error'})
  }
}

exports.addCategory = async (req, res) => {
  const { name, description } = req.body
  try {
    // Check category name is unique
    const existingCategory = await Category.findOne({ name })
    if (existingCategory) {
      return res.status(400).json({ error: 'Bu isimde bir kategori zaten var.' })
    }

    // Create and Add new category
    const newCategory = new Category({ name, description })
    await newCategory.save()
    
    res.status(201).json({ success: true, message: 'Kategori başarıyla eklendi', category: newCategory})
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error'})
  }
}
