import Input from '../form/input/input';
import Textarea from '../form/textarea/textarea';
import Button from '../button/button';
import styles from './atividade.module.scss';
import { GoCalendar, GoPencil } from 'react-icons/go';

const Atividade = () => {
  return (
    <div className={styles.enviarAtividade}>
      <form>
        <div className={styles.input__group}>
          <Input
            icon={<GoCalendar />}
            type="text"
            name="titulo"
            placeholder="Defina um título para sua atividade"
            // value={desafio.data_inicial}
            // onChange={(e) =>
            //   setDesafio({ ...desafio, data_inicial: e.target.value })
            // }
          />
        </div>
        <div className={styles.input__group}>
          <label>Data da Atividade</label>
          <Input
            icon={<GoPencil />}
            type="date"
            name="data_inicial"
            // value={desafio.data_inicial}
            // onChange={(e) =>
            //   setDesafio({ ...desafio, data_inicial: e.target.value })
            // }
          />
        </div>
        <div className={styles.input__group}>
          <label>Descrição</label>
          {/* Corrigido para passar o nome correto do estilo do textarea */}
          <Textarea
            id="textarea" // Troquei para o estilo correto aqui
            placeholder="Descreva sua atividade"
          />
        </div>
        <div className={styles.button_atividade}>
          <Button id="atividade" text="Enviar Atividade" type="submit" />
        </div>
      </form>
      <label>Título da Atividade</label>
    </div>
  );
};

export default Atividade;
