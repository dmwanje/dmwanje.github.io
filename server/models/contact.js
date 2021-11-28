
const mongoose = require('mongoose');
const sequenceGenerator = require('./sequenceGenerator');
const Contact = require('../models/contact');


const contactSchema = mongoose.Schema({
    id: { type: String, required: true },
    name: { type: String,required: true },
    email: { type: String },
    phone: { type: String },
    imageUrl: { type: String},
    group: []
 });
 
 module.exports = mongoose.model('Contact', contactSchema);

 router.get('/', (req, res, next) => {
    Contact.find()
      .populate('group')
      .then(contacts => {
        res.status(200).json({
            message: 'Contacts fetched successfully!',
            contacts: contacts
          });
      })
      .catch(error => {
        res.status(500).json({
          message: 'An error occurred',
          error: error
        });
      });
  });

router.post('/', (req, res, next) => {
        const maxContactId = sequenceGenerator.nextId("contacts");
      
        const contact = new Contact({
          id: maxContactId,
          name: req.body.name,
          email: req.body.email,
          phone: req.body.phone,
          imageUrl: req.body.imageUrl,
          group: req.body.group,

        });
      
        contact.save()
          .then(createdContact => {
            res.status(201).json({
              message: 'Contact added successfully',
              contact: createdContact
            });
          })
          .catch(error => {
             res.status(500).json({
                message: 'An error occurred',
                error: error
              });
          });
      });

router.put('/:id', (req, res, next) => {
        Contact.findOne({ id: req.params.id })
          .then(contact => {
            contact.name = req.body.name;
            contact.email = req.body.email;
            contact.phone = req.body.phone;
            contact.imageUrl = req.body.imageUrl;
      
            Contact.updateOne({ id: req.params.id }, contact)
              .then(result => {
                res.status(204).json({
                  message: 'Contact updated successfully'
                })
              })
              .catch(error => {
                 res.status(500).json({
                 message: 'An error occurred',
                 error: error
               });
              });
          })
          .catch(error => {
            res.status(500).json({
              message: 'Contact not found.',
              error: { Contact: 'Contact not found'}
            });
          });
      });

router.delete("/:id", (req, res, next) => {
        Contact.findOne({ id: req.params.id })
          .then(contact => {
            Contact.deleteOne({ id: req.params.id })
              .then(result => {
                res.status(204).json({
                  message: "Contact deleted successfully"
                });
              })
              .catch(error => {
                 res.status(500).json({
                 message: 'An error occurred',
                 error: error
               });
              })
          })
          .catch(error => {
            res.status(500).json({
              message: 'Contact not found.',
              error: { contact: 'Contact not found'}
            });
          });
      });