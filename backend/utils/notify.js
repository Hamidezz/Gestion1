exports.notify = (req, docsLength, collId) => {
  req.app
    .get('socketService')
    .emiter('notifySuccess', {
      notification: {
        text: `you have new collection from service1 with ${docsLength} documents`,
        collId,
        from: 'service1',
        to: 'service2',
      },
    })
}
