import { db } from '../models/index.js';
import { logger } from '../config/logger.js';

const create = async (req, res) => {
  try {
    const { name, subject, type, value } = req.body;
    const gradeFind = await db.gradesModel.find({ name, subject, type, value });

    if (gradeFind.length === 0) {

      const grade = new db.gradesModel({ name, subject, type, value });

      await grade.save();

      logger.info(`POST /grade - ${JSON.stringify(req.body)}`);

      res.status(200).json({ message: "Salvo com sucesso", grade });
    } else {
      throw 'Duplicated grade';
    }
  } catch (error) {
    res
      .status(500)
      .send({ message: error.message || 'Algum erro ocorreu ao salvar' });
    logger.error(`POST /grade - ${JSON.stringify(error.message)}`);
  }
};

const findAll = async (req, res) => {
  const name = req.query.name;

  var condition = name
    ? { name: { $regex: new RegExp(name), $options: 'i' } }
    : {};

  try {
    const grades = await db.gradesModel.find(condition);

    res.status(200).send(grades);

    logger.info(`GET /grade`);
  } catch (error) {
    res
      .status(500)
      .send({ message: error.message || 'Erro ao listar todos os documentos' });
    logger.error(`GET /grade - ${JSON.stringify(error.message)}`);
  }
};

const findOne = async (req, res) => {
  const id = req.params.id;

  try {
    const singleGrade = await db.gradesModel.find({ _id: id });

    if (singleGrade.length === 0) {
      throw new Error(`grade ${singleGrade} not found`);
    }
    
    res.status(200).send(singleGrade[0]);

    logger.info(`GET /grade - ${id}`);
  } catch (error) {
    res.status(500).send({ message: 'Erro ao buscar o Grade id: ' + id });
    logger.error(`GET /grade - ${JSON.stringify(error.message)}`);
  }
};

const update = async (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: 'Dados para atualizacao vazio',
    });
  }
  
  const id = req.params.id;
  console.log(id);
  console.log(req.body);
  

  try {
    await db.gradesModel.findOneAndUpdate(
      { '_id': id },
      req.body);
    res.send({ message: 'Grade atualizado com sucesso' });

    logger.info(`PUT /grade - ${id} - ${JSON.stringify(req.body)}`);
  } catch (error) {
    res.status(500).send({ message: 'Erro ao atualizar a Grade id: ' + id });
    logger.error(`PUT /grade - ${JSON.stringify(error.message)}`);
  }
};

const remove = async (req, res) => {
  const id = req.params.id;

  try {
    await db.gradesModel.findOneAndDelete({ '_id': id });
    res.send({ message: 'Grade excluido com sucesso' });

    logger.info(`DELETE /grade - ${id}`);
  } catch (error) {
    res
      .status(500)
      .send({ message: 'Nao foi possivel deletar o Grade id: ' + id });
    logger.error(`DELETE /grade - ${JSON.stringify(error.message)}`);
  }
};

const removeAll = async (req, res) => {
  const id = req.params.id;

  try {
    const gradeTypes = await transactionModel.distinct("type");

    for (let type of gradeTypes) {
      await db.gradesModel.deleteMany({ type });
    }
    res.send({
      message: `Grades excluidos`,
    });
    logger.info(`DELETE /grade`);
  } catch (error) {
    res.status(500).send({ message: 'Erro ao excluir todos as Grades' });
    logger.error(`DELETE /grade - ${JSON.stringify(error.message)}`);
  }
};

export default { create, findAll, findOne, update, remove, removeAll };
